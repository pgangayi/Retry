"use client";

import { useState } from "react";

/**
 * Basic Knowledge Base Module
 * Simple article management for farming guides
 */

type Article = {
  id: number;
  title: string;
  category: "Crops" | "Livestock" | "Equipment" | "General";
  content: string;
  author: string;
  created_at: string;
  tags: string[];
};

const MOCK_ARTICLES: Article[] = [
  {
    id: 1,
    title: "Maize Planting Guide",
    category: "Crops",
    content: "Step-by-step guide for planting maize including soil preparation, seed selection, and irrigation requirements.",
    author: "Farm Extension Officer",
    created_at: "2025-10-15T10:00:00Z",
    tags: ["maize", "planting", "crops"]
  },
  {
    id: 2,
    title: "Chicken Health Management",
    category: "Livestock",
    content: "Essential practices for maintaining chicken health including vaccination schedules and disease prevention.",
    author: "Veterinary Services",
    created_at: "2025-10-10T14:30:00Z",
    tags: ["chickens", "health", "vaccination"]
  },
  {
    id: 3,
    title: "Tractor Maintenance Schedule",
    category: "Equipment",
    content: "Regular maintenance checklist for farm tractors to ensure optimal performance and longevity.",
    author: "Equipment Manager",
    created_at: "2025-10-05T09:15:00Z",
    tags: ["tractor", "maintenance", "equipment"]
  }
];

export default function KBPage() {
  const [articles, setArticles] = useState<Article[]>(MOCK_ARTICLES);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [showAddForm, setShowAddForm] = useState(false);
  const [articleForm, setArticleForm] = useState({
    title: "",
    category: "General" as Article["category"],
    content: "",
    author: "",
    tags: ""
  });

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addArticle = () => {
    if (!articleForm.title || !articleForm.content || !articleForm.author) return;

    const newArticle: Article = {
      id: Math.max(...articles.map(a => a.id)) + 1,
      title: articleForm.title,
      category: articleForm.category,
      content: articleForm.content,
      author: articleForm.author,
      created_at: new Date().toISOString(),
      tags: articleForm.tags.split(",").map(tag => tag.trim()).filter(tag => tag)
    };

    setArticles([newArticle, ...articles]);
    setArticleForm({
      title: "",
      category: "General",
      content: "",
      author: "",
      tags: ""
    });
    setShowAddForm(false);
  };

  return (
    <div className="p-4 md:p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Knowledge Base</h1>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {showAddForm ? "Cancel" : "Add Article"}
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded border p-4 mb-6">
        <div className="grid gap-4 md:grid-cols-3">
          <input
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded px-3 py-2"
          />

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border rounded px-3 py-2"
          >
            <option value="All">All Categories</option>
            <option value="Crops">Crops</option>
            <option value="Livestock">Livestock</option>
            <option value="Equipment">Equipment</option>
            <option value="General">General</option>
          </select>

          <div className="text-sm text-gray-600 flex items-center">
            {filteredArticles.length} article(s) found
          </div>
        </div>
      </div>

      {/* Add Article Form */}
      {showAddForm && (
        <div className="bg-white rounded border p-4 mb-6">
          <h2 className="text-lg font-medium mb-4">Add New Article</h2>

          <div className="space-y-3">
            <input
              placeholder="Article title"
              value={articleForm.title}
              onChange={(e) => setArticleForm({...articleForm, title: e.target.value})}
              className="w-full border rounded px-3 py-2"
            />

            <div className="grid grid-cols-2 gap-3">
              <select
                value={articleForm.category}
                onChange={(e) => setArticleForm({...articleForm, category: e.target.value as Article["category"]})}
                className="border rounded px-3 py-2"
              >
                <option value="General">General</option>
                <option value="Crops">Crops</option>
                <option value="Livestock">Livestock</option>
                <option value="Equipment">Equipment</option>
              </select>

              <input
                placeholder="Author name"
                value={articleForm.author}
                onChange={(e) => setArticleForm({...articleForm, author: e.target.value})}
                className="border rounded px-3 py-2"
              />
            </div>

            <textarea
              placeholder="Article content..."
              rows={4}
              value={articleForm.content}
              onChange={(e) => setArticleForm({...articleForm, content: e.target.value})}
              className="w-full border rounded px-3 py-2"
            />

            <input
              placeholder="Tags (comma separated)"
              value={articleForm.tags}
              onChange={(e) => setArticleForm({...articleForm, tags: e.target.value})}
              className="w-full border rounded px-3 py-2"
            />

            <button
              onClick={addArticle}
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
            >
              Save Article
            </button>
          </div>
        </div>
      )}

      {/* Articles List */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredArticles.map((article) => (
          <div key={article.id} className="bg-white rounded border p-4">
            <div className="flex justify-between items-start mb-2">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                article.category === "Crops" ? "bg-green-100 text-green-800" :
                article.category === "Livestock" ? "bg-blue-100 text-blue-800" :
                article.category === "Equipment" ? "bg-orange-100 text-orange-800" :
                "bg-gray-100 text-gray-800"
              }`}>
                {article.category}
              </span>
            </div>

            <h3 className="font-medium mb-2">{article.title}</h3>
            <p className="text-sm text-gray-600 mb-3 line-clamp-3">{article.content}</p>

            <div className="text-xs text-gray-500 mb-2">
              By {article.author} • {new Date(article.created_at).toLocaleDateString()}
            </div>

            {article.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {article.tags.map((tag, index) => (
                  <span key={index} className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-700">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredArticles.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No articles found matching your search.
        </div>
      )}
    </div>
  );
}