// src/features/discover/Discover.tsx
// Discover page for exploring skills, people, and learning opportunities

import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Users, 
  BookOpen, 
  Star, 
  TrendingUp, 
  Clock, 
  Award, 
  MapPin,
  Target
} from 'lucide-react';

interface Skill {
  id: string;
  name: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  description: string;
  teacherCount: number;
  studentCount: number;
  rating: number;
  image: string;
  tags: string[];
  price?: number;
  duration?: string;
}

interface User {
  id: string;
  name: string;
  avatar: string;
  headline: string;
  location: string;
  skillsOffered: number;
  skillsWanted: number;
  rating: number;
  sessions: number;
  rank: string;
  isOnline: boolean;
}

const Discover: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'skills' | 'people' | 'trending'>('skills');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  // Mock data
  const skills: Skill[] = [
    {
      id: '1',
      name: 'Web Development',
      category: 'Programming',
      level: 'intermediate',
      description: 'Learn modern web development with React, Node.js, and more',
      teacherCount: 45,
      studentCount: 230,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop',
      tags: ['React', 'Node.js', 'JavaScript'],
      price: 0,
      duration: '8 weeks'
    },
    {
      id: '2',
      name: 'Digital Marketing',
      category: 'Marketing',
      level: 'beginner',
      description: 'Master digital marketing strategies and social media',
      teacherCount: 32,
      studentCount: 180,
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
      tags: ['SEO', 'Social Media', 'Analytics'],
      price: 0,
      duration: '6 weeks'
    },
    {
      id: '3',
      name: 'UI/UX Design',
      category: 'Design',
      level: 'advanced',
      description: 'Advanced UI/UX design principles and tools',
      teacherCount: 28,
      studentCount: 150,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1559028006-848a653849c9?w=400&h=300&fit=crop',
      tags: ['Figma', 'Prototyping', 'User Research'],
      price: 0,
      duration: '10 weeks'
    },
    {
      id: '4',
      name: 'Data Science',
      category: 'Programming',
      level: 'advanced',
      description: 'Data analysis, machine learning, and AI fundamentals',
      teacherCount: 38,
      studentCount: 200,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
      tags: ['Python', 'Machine Learning', 'Statistics'],
      price: 0,
      duration: '12 weeks'
    }
  ];

  const users: User[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop',
      headline: 'Full-Stack Developer & Tech Mentor',
      location: 'San Francisco, CA',
      skillsOffered: 8,
      skillsWanted: 3,
      rating: 4.9,
      sessions: 45,
      rank: 'Gold',
      isOnline: true
    },
    {
      id: '2',
      name: 'Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      headline: 'Marketing Expert & Growth Hacker',
      location: 'New York, NY',
      skillsOffered: 6,
      skillsWanted: 4,
      rating: 4.8,
      sessions: 32,
      rank: 'Silver',
      isOnline: false
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
      headline: 'UI/UX Designer & Creative Director',
      location: 'Austin, TX',
      skillsOffered: 5,
      skillsWanted: 2,
      rating: 4.7,
      sessions: 28,
      rank: 'Gold',
      isOnline: true
    }
  ];

  const categories = ['all', 'Programming', 'Design', 'Marketing', 'Business', 'Language'];
  const levels = ['all', 'beginner', 'intermediate', 'advanced', 'expert'];

  const filteredSkills = skills.filter(skill => {
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         skill.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         skill.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || skill.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || skill.level === selectedLevel;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.headline.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getLevelColor = (level: string) => {
    const colors = {
      beginner: 'bg-green-100 text-green-700',
      intermediate: 'bg-blue-100 text-blue-700',
      advanced: 'bg-purple-100 text-purple-700',
      expert: 'bg-amber-100 text-amber-700'
    };
    return colors[level as keyof typeof colors] || 'bg-gray-100 text-gray-700';
  };

  const getRankColor = (rank: string) => {
    const colors = {
      Bronze: 'bg-amber-100 text-amber-700',
      Silver: 'bg-gray-100 text-gray-700',
      Gold: 'bg-yellow-100 text-yellow-700',
      Platinum: 'bg-purple-100 text-purple-700'
    };
    return colors[rank as keyof typeof colors] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Discover New Skills & People</h1>
            <p className="text-xl mb-8 text-purple-100">
              Explore amazing learning opportunities and connect with skilled mentors
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search skills, people, or topics..."
                  className="block w-full pl-10 pr-3 py-3 border border-transparent rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                />
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <Filter className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                </button>
              </div>
              
              {/* Filters */}
              {showFilters && (
                <div className="mt-4 p-4 bg-white/10 backdrop-blur-sm rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Category</label>
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full px-3 py-2 border border-transparent rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                      >
                        {categories.map(cat => (
                          <option key={cat} value={cat}>
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Level</label>
                      <select
                        value={selectedLevel}
                        onChange={(e) => setSelectedLevel(e.target.value)}
                        className="w-full px-3 py-2 border border-transparent rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                      >
                        {levels.map(level => (
                          <option key={level} value={level}>
                            {level.charAt(0).toUpperCase() + level.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('skills')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'skills'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <BookOpen className="h-4 w-4" />
                <span>Skills</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('people')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'people'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>People</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('trending')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'trending'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4" />
                <span>Trending</span>
              </div>
            </button>
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'skills' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSkills.map((skill) => (
              <div key={skill.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={skill.image}
                    alt={skill.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-2 right-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(skill.level)}`}>
                      {skill.level}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{skill.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{skill.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {skill.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{skill.teacherCount} teachers</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-amber-400" />
                      <span>{skill.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{skill.duration}</span>
                    </div>
                  </div>
                  
                  <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors">
                    Explore Skill
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'people' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.map((user) => (
              <div key={user.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="relative">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      {user.isOnline && (
                        <div className="absolute bottom-0 right-0 h-4 w-4 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
                      <p className="text-sm text-gray-600">{user.headline}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRankColor(user.rank)}`}>
                          {user.rank}
                        </span>
                        <div className="flex items-center space-x-1">
                          <Star className="h-3 w-3 text-amber-400" />
                          <span className="text-xs text-gray-600">{user.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4" />
                      <span>{user.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <BookOpen className="h-4 w-4" />
                      <span>{user.skillsOffered} skills offered</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Target className="h-4 w-4" />
                      <span>{user.skillsWanted} skills wanted</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Award className="h-4 w-4" />
                      <span>{user.sessions} sessions completed</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors">
                      View Profile
                    </button>
                    <button className="flex-1 border border-purple-600 text-purple-600 py-2 px-4 rounded-lg hover:bg-purple-50 transition-colors">
                      Message
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'trending' && (
          <div className="text-center py-12">
            <TrendingUp className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Trending Skills & Topics</h3>
            <p className="text-gray-600 mb-6">
              Discover what's popular in the SkillSwap community right now
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {['React Development', 'Data Science', 'UI/UX Design', 'Digital Marketing', 'Machine Learning', 'Blockchain'].map((trend, index) => (
                <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">{trend}</span>
                    <span className="text-sm text-purple-600">+{Math.floor(Math.random() * 50) + 10}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Discover;
