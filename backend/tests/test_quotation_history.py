"""Integration coverage for quotation manual-save version history."""

import json
from types import SimpleNamespace

import pytest
from fastapi import HTTPException
from backend.models import Quotation, QuotationHistory
from backend.routers.quotations import create_history_snapshot, get_history, restore_history, HistorySnapshotRequest


def test_manual_save_creates_previewable_history_snapshot(db, trainee_user):
    document = {
        "quotationDetails": {"quotationNo": "KM-TEST-001", "date": "2026-07-23"},
        "clientInfo": {"company": "Kusakabe Electric", "contact": "Mr. Fujii"},
        "tasks": [],
    }
    quotation = Quotation(
        quotation_no="KM-TEST-001",
        client_name="Kusakabe Electric",
        designer_name=trainee_user.full_name,
        data=json.dumps(document),
    )
    db.add(quotation)
    db.commit()
    db.refresh(quotation)

    response = create_history_snapshot(
        q_id=quotation.id,
        payload=HistorySnapshotRequest(label="Manual Save"),
        request=SimpleNamespace(client=SimpleNamespace(host="testclient")),
        db=db,
        current_user=trainee_user,
    )

    entry = response["history"]
    assert entry["label"] == "Manual Save"
    assert entry["author"] == trainee_user.full_name

    stored = db.query(QuotationHistory).filter_by(id=entry["id"]).one()
    assert json.loads(stored.data) == document

    history_response = get_history(quotation.id, db)
    assert history_response["history"][0]["id"] == entry["id"]

    preview_response = restore_history(quotation.id, entry["id"], db)
    assert preview_response == document


def test_manual_save_requires_an_existing_quotation(db, trainee_user):
    with pytest.raises(HTTPException) as exc_info:
        create_history_snapshot(
            q_id=999999,
            payload=HistorySnapshotRequest(label="Manual Save"),
            request=SimpleNamespace(client=SimpleNamespace(host="testclient")),
            db=db,
            current_user=trainee_user,
        )

    assert exc_info.value.status_code == 404
