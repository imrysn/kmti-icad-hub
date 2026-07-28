import json

from backend.models import Quotation
from backend.routers.quotations import calculate_grand_total


def _document():
    return {
        "quotationDetails": {"quotationNo": "KMTE-53", "date": "2026-07-22"},
        "clientInfo": {
            "company": "Kusakabe Electric and Machinery Co., Ltd.",
            "contact": "Mr. Seiichi Fujigami",
        },
        "billingDetails": {
            "quotationStatus": "DRAFT",
            "projectStatus": "On Going",
            "projectInCharge": "Engineer One",
        },
        "signatures": {"quotation": {"preparedBy": {"name": "Engineer One"}}},
        "layoutVariant": "special",
        "tasks": [
            {
                "id": 1,
                "parentId": None,
                "isMainTask": True,
                "type": "3D",
                "hours": 2,
                "minutes": 30,
                "overtimeHours": 1,
                "softwareUnits": 1,
            }
        ],
        "baseRates": {
            "timeChargeRate3D": 1000,
            "overtimeRate": 1300,
            "softwareRate": 500,
            "overheadPercentage": 10,
        },
        "manualOverrides": {"tasks": {}, "footer": {"adjustment": -100}},
    }


def test_calculate_grand_total_matches_saved_document():
    # 2.5h labor + 1h overtime + software = 4,300; overhead = 430; adjustment = -100.
    assert calculate_grand_total(_document()) == 4630.0


def test_autosave_updates_document_and_metadata(client, db, trainee_token):
    quotation = Quotation(
        quotation_no="KMTE-53",
        client_name="",
        designer_name="",
        data="{}",
        display_name="KMTE-53",
    )
    db.add(quotation)
    db.commit()
    db.refresh(quotation)

    response = client.patch(
        f"/api/v1/quotations/{quotation.id}",
        json=_document(),
        headers={"Authorization": f"Bearer {trainee_token}"},
    )

    assert response.status_code == 200
    db.refresh(quotation)
    assert json.loads(quotation.data)["quotationDetails"]["quotationNo"] == "KMTE-53"
    assert quotation.client_name == "Kusakabe Electric and Machinery Co., Ltd."
    assert quotation.customer_incharge == "Mr. Seiichi Fujigami"
    assert quotation.designer_name == "Engineer One"
    assert quotation.grand_total == 4630.0
    assert quotation.updated_by == "trainee_test"
