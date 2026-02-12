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
from chromadb.config import Settings
from chromadb.utils import embedding_functions

class RAGEngine:
    def __init__(self, persist_directory: str = "./vector_db"):
        """
        Initialize ChromaDB client and collection.
        
        Args:
            persist_directory: Path to store ChromaDB data
        """
        self.persist_directory = persist_directory
        
        # Initialize ChromaDB client with persistent storage
        self.client = chromadb.Client(Settings(
            persist_directory=persist_directory,
            anonymized_telemetry=False
        ))
        
        # Use default embedding function (all-MiniLM-L6-v2)
        self.embedding_function = embedding_functions.DefaultEmbeddingFunction()
        
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
        
        self.collection.add(
            ids=ids,
            documents=texts,
            metadatas=metadatas
        )
        
        print(f"✅ Ingested {len(documents)} documents into ChromaDB")
    
    def search(self, query: str, n_results: int = 5) -> List[Dict]:
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
                result = {
                    'content': doc,
                    'source': results['metadatas'][0][i].get('source', 'unknown'),
                    'score': 1.0 - results['distances'][0][i] if results['distances'] else None
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
