"""
RAG Engine using ChromaDB for semantic search over iCAD knowledge base.

This implementation:
- Ingests Excel files into ChromaDB vector store
- Performs semantic search using embeddings
- Returns results with relevance scores
"""

import os
from typing import List, Dict
import chromadb

class RAGEngine:
    def __init__(self, persist_directory: str = None):
        """
        Initialize ChromaDB client and collection.
        
        Args:
            persist_directory: Path to store ChromaDB data. 
                              If None, defaults to 'vector_db' inside the backend folder.
        """
        if persist_directory is None:
            # Standardize on absolute path relative to this file
            base_dir = os.path.dirname(os.path.abspath(__file__))
            self.persist_directory = os.path.join(base_dir, "vector_db")
        else:
            self.persist_directory = persist_directory
        
        # Use PersistentClient (replaces the removed chromadb.Client(Settings(...)))
        self.client = chromadb.PersistentClient(path=self.persist_directory)
        
        # Use default embedding function (all-MiniLM-L6-v2)
        self.embedding_function = chromadb.utils.embedding_functions.DefaultEmbeddingFunction()
        
        # Get or create collection
        self.collection = self.client.get_or_create_collection(
            name="icad_knowledge_base",
            embedding_function=self.embedding_function,
            metadata={"description": "iCAD technical documentation and manuals"}
        )
    
    def ingest_documents(self, documents: List[Dict[str, str]]):
        """
        Ingest documents into the vector store.
        
        Args:
            documents: List of dicts with keys:
                - id: Unique identifier (e.g., "excel_row_5")
                - text: The content to embed
                - metadata: Dict with source info (e.g., {"source": "manual.xlsx", "row": 5})
        """
        ids = [doc['id'] for doc in documents]
        texts = [doc['text'] for doc in documents]
        metadatas = [doc.get('metadata', {}) for doc in documents]
        
        # Use upsert so re-running ingestion doesn't crash on duplicate IDs
        self.collection.upsert(
            ids=ids,
            documents=texts,
            metadatas=metadatas
        )
        
        print(f"✅ Ingested {len(documents)} documents into ChromaDB")
    
    def search(self, query: str, n_results: int = 15) -> List[Dict]:
        """
        Hybrid search combining semantic and lexical results.
        
        Args:
            query: Search query
            n_results: Total results to return after merging
            
        Returns:
            List of dicts with keys: id, content, source, score
        """
        # 1. Semantic Search
        semantic_results = self.collection.query(
            query_texts=[query],
            n_results=n_results * 2 # Get more for better merging
        )
        
        # 2. Lexical Search (BM25)
        lexical_results = self._lexical_search(query, n_results=n_results * 2)
        
        # 3. Hybrid Merging (Reciprocal Rank Fusion)
        # We use Reciprocal Rank Fusion to combine two different scoring systems
        rrf_scores = {}
        k = 60 # RRF constant
        
        doc_map = {} # Store metadata and content to avoid re-fetching
        
        # Process semantic results
        if semantic_results['ids'] and semantic_results['ids'][0]:
            for i, doc_id in enumerate(semantic_results['ids'][0]):
                rrf_scores[doc_id] = rrf_scores.get(doc_id, 0.0) + (1.0 / (k + i + 1))
                doc_map[doc_id] = {
                    'content': semantic_results['documents'][0][i],
                    'source': semantic_results['metadatas'][0][i].get('source', 'unknown'),
                    'score': 1.0 - semantic_results['distances'][0][i] if semantic_results['distances'] else 0.0
                }
        
        # Process lexical results
        for i, res in enumerate(lexical_results):
            doc_id = res['id']
            rrf_scores[doc_id] = rrf_scores.get(doc_id, 0.0) + (1.0 / (k + i + 1))
            if doc_id not in doc_map:
                doc_map[doc_id] = {
                    'content': res['content'],
                    'source': res['source'],
                    'metadata': res.get('metadata', {}),
                    'score': res['score'] # Original BM25 score (non-normalized)
                }
        
        # Sort by RRF score
        sorted_ids = sorted(rrf_scores.keys(), key=lambda x: rrf_scores[x], reverse=True)
        
        formatted_results = []
        for doc_id in sorted_ids[:n_results]:
            data = doc_map[doc_id]
            formatted_results.append({
                'id': doc_id,
                'content': data['content'],
                'source': data['source'],
                'metadata': data.get('metadata', {}),
                'score': rrf_scores[doc_id] # Final merged score
            })
            
        return formatted_results

    def _lexical_search(self, query: str, n_results: int = 10) -> List[Dict]:
        """Simple BM25 search over the current collection"""
        # Use simple lazy indexing for this implementation
        docs = self.collection.get()
        if not docs['documents']:
            return []
            
        from rank_bm25 import BM25Okapi
        import re
        
        def tokenize(text):
            return re.sub(r'[^a-zA-Z0-9\s]', '', text.lower()).split()
        
        tokenized_corpus = [tokenize(doc) for doc in docs['documents']]
        bm25 = BM25Okapi(tokenized_corpus)
        
        query_tokens = tokenize(query)
        scores = bm25.get_scores(query_tokens)
        
        # Get top indices
        import numpy as np
        top_indices = np.argsort(scores)[::-1][:n_results]
        
        lex_results = []
        for idx in top_indices:
            if scores[idx] > 0: # Only return actual matches
                lex_results.append({
                    'id': docs['ids'][idx],
                    'content': docs['documents'][idx],
                    'source': docs['metadatas'][idx].get('source', 'unknown'),
                    'score': float(scores[idx])
                })
                
        return lex_results

    def get_collection_stats(self) -> Dict:
        """Get statistics about the current collection"""
        count = self.collection.count()
        return {
            'total_documents': count,
            'collection_name': self.collection.name,
            'persist_directory': self.persist_directory
        }
    
    def clear_collection(self):
        """Clear all documents from the collection without deleting the collection itself"""
        # Fetch all IDs to delete them (Chroma doesn't support empty where in some versions)
        results = self.collection.get()
        if results['ids']:
            self.collection.delete(ids=results['ids'])
        print("✅ Cleared documents from collection")

# Singleton instance
rag_engine = RAGEngine()
