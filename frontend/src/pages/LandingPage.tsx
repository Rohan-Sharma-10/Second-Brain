import { Brain, Youtube, Twitter, FileText, Layout } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function LandingPage() {
  const navigate = useNavigate();

  const handleSignup = () => {
    navigate("/signup")
  }

  const handleSignin = () => {
    navigate("/signin")
  }

  
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-primary-purple" />
              <span className="text-2xl font-bold text-primary-purple">Second Brain</span>
            </div>
            <div className="flex space-x-4">
              <button onClick={handleSignin} className="btn-outline">Login</button>
              <button onClick={handleSignup} className="btn-primary">Sign Up</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-b from-purple-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Your Digital Memory, <span className="text-primary-purple">Organized</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12">
              Transform your digital content into organized knowledge. Store and manage your YouTube videos, Twitter posts, documents, and links all in one place.
            </p>
            <div className="flex justify-center space-x-6">
              <button onClick={handleSignup} className="btn-primary">Get Started</button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24">
            <div className="feature-card">
              <Layout className="w-12 h-12 text-primary-purple mb-4 transform group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold mb-2">All Content</h3>
              <p className="text-gray-600">View and manage all your digital content</p>
            </div>
            <div className="feature-card">
              <Youtube className="w-12 h-12 text-primary-purple mb-4 transform group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold mb-2">Video Content</h3>
              <p className="text-gray-600">Save and organize your favorite YouTube videos</p>
            </div>
            <div className="feature-card">
              <Twitter className="w-12 h-12 text-primary-purple mb-4 transform group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold mb-2">Twitter Posts</h3>
              <p className="text-gray-600">Keep track of important tweets and threads</p>
            </div>
            <div className="feature-card">
              <FileText className="w-12 h-12 text-primary-purple mb-4 transform group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold mb-2">Documents</h3>
              <p className="text-gray-600">Store and manage your important documents</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
