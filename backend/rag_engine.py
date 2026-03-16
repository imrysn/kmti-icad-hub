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
        self.client = chromadb.PersistentClient(path=persist_directory)
        
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
    
    def search(self, query: str, n_results: int = 8) -> List[Dict]:
        """
        Semantic search over the knowledge base.
        
        Args:
            query: Search query
            n_results: Number of results to return
            
        Returns:
            List of dicts with keys: content, source, score
        """
        results = self.collection.query(
            query_texts=[query],
            n_results=n_results
        )
        
        # Format results for the API
        formatted_results = []
        
        if results['documents'] and results['documents'][0]:
            for i, doc in enumerate(results['documents'][0]):
                raw_score = 1.0 - results['distances'][0][i] if results['distances'] else None
                result = {
                    'id': results['ids'][0][i],
                    'content': doc,
                    'source': results['metadatas'][0][i].get('source', 'unknown'),
                    'score': max(0.0, raw_score) if raw_score is not None else None
                }
                formatted_results.append(result)
        
        return formatted_results
    
    def get_collection_stats(self) -> Dict:
        """Get statistics about the current collection"""
        count = self.collection.count()
        return {
            'total_documents': count,
            'collection_name': self.collection.name,
            'persist_directory': self.persist_directory
        }
    
    def clear_collection(self):
        """Clear all documents from the collection"""
        self.client.delete_collection(name="icad_knowledge_base")
        self.collection = self.client.get_or_create_collection(
            name="icad_knowledge_base",
            embedding_function=self.embedding_function
        )
        print("✅ Cleared collection")

# Singleton instance
rag_engine = RAGEngine()
