// src/features/profile/ProfileSimple.tsx
// Simple profile page without Supabase dependency

import React, { useState } from 'react';
import { 
  MapPin, 
  Star, 
  Award, 
  MessageCircle, 
  Edit3, 
  Share2, 
  BookOpen, 
  Calendar, 
  CheckCircle2, 
  Plus, 
  AlertCircle, 
  Languages, 
  ShieldCheck, 
  Gift, 
  GraduationCap, 
  Target, 
} from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

type Tab = 'overview' | 'sessions' | 'reviews';

type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

interface ProfileRow {
  id: string;
  full_name: string | null;
  bio: string | null;
  headline: string | null;
  avatar_url: string | null;
  cover_url: string | null;
  location: string | null;
  languages: string[] | null;
  availability: string | null;
  created_at: string;
}

interface PrivacySettings {
  show_location: boolean;
  show_languages: boolean;
  show_availability: boolean;
  show_points: boolean;
  show_reviews: boolean;
  show_exchange_history: boolean;
  show_learning_skills: boolean;
}

interface SkillItem {
  id: string;
  name: string;
  category: string;
  level: SkillLevel;
  type: 'offer' | 'learn';
  isActive: boolean;
  visibility: 'public' | 'hidden';
}

interface SessionItem {
  id: string;
  partnerName: string;
  partnerImage: string | null;
  skill: string;
  date: string;
  type: 'given' | 'received';
}

interface CompletionItem {
  id: string;
  label: string;
  description: string;
  completed: boolean;
  weight: number;
  actionLabel: string;
}

const fallbackCover =
  'https://images.unsplash.com/photo-1519681393244-9e01c0f9e88.jpg?w=1200&h=400&fit=crop';

const fallbackAvatar =
  'https://ui-avatars.com/api/?name=SkillSwap&background=4f46e5&color=fff';

const ProfileSimple: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Mock data for now
  const profile: ProfileRow | null = {
    id: '1',
    full_name: 'Alex Rivera',
    bio: 'Full-stack developer passionate about teaching code and learning design. Always excited to exchange knowledge!',
    headline: 'Senior Full-Stack Developer',
    avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff85?w=400&h=400&fit=crop',
    cover_url: fallbackCover,
    location: 'San Francisco, CA',
    languages: ['English', 'Spanish', 'Portuguese'],
    availability: 'Weekdays 6pm-10pm PST',
    created_at: '2024-01-15'
  };

  const privacy: PrivacySettings | null = {
    show_location: true,
    show_languages: true,
    show_availability: true,
    show_points: true,
    show_reviews: true,
    show_exchange_history: true,
    show_learning_skills: true,
  };

  const skills: SkillItem[] = [
    { id: '1', name: 'React & TypeScript', level: 'expert', category: 'Programming', type: 'offer', isActive: true, visibility: 'public' },
    { id: '2', name: 'Node.js', level: 'advanced', category: 'Programming', type: 'offer', isActive: true, visibility: 'public' },
    { id: '3', name: 'UI/UX Design', level: 'intermediate', category: 'Design', type: 'offer', isActive: true, visibility: 'public' },
    { id: '4', name: 'Python', level: 'advanced', category: 'Programming', type: 'offer', isActive: true, visibility: 'public' },
    { id: '5', name: 'Spanish Guitar', level: 'beginner', category: 'Music', type: 'learn', isActive: true, visibility: 'public' },
    { id: '6', name: 'Photography', level: 'beginner', category: 'Arts', type: 'learn', isActive: true, visibility: 'public' },
    { id: '7', name: 'Public Speaking', level: 'intermediate', category: 'Communication', type: 'learn', isActive: true, visibility: 'public' }
  ];

  const sessions: SessionItem[] = [
    {
      id: '1',
      partnerName: 'Sarah Chen',
      partnerImage: 'https://images.unsplash.com/photo-1494790108377-be9c0b53ab?w=100&h=100&fit=crop',
      skill: 'React Patterns',
      date: '2 days ago',
      type: 'given'
    },
    {
      id: '2',
      partnerName: 'Marcus Johnson',
      partnerImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      skill: 'Spanish Basics',
      date: '1 week ago',
      type: 'received'
    }
  ];

  const skillsOffered = skills.filter((skill) => skill.type === 'offer');
  const skillsWanted = skills.filter((skill) => skill.type === 'learn');

  const completionItems: CompletionItem[] = [
    {
      id: 'avatar',
      label: 'Profile photo',
      description: 'Add a clear profile photo to increase trust.',
      completed: Boolean(profile?.avatar_url),
      weight: 10,
      actionLabel: 'Add photo',
    },
    {
      id: 'bio',
      label: 'Short bio',
      description: 'Explain who you are and what you can help with.',
      completed: Boolean(profile?.bio),
      weight: 10,
      actionLabel: 'Add bio',
    },
    {
      id: 'location',
      label: 'Location',
      description: 'Add your location to improve local matching.',
      completed: Boolean(profile?.location),
      weight: 5,
      actionLabel: 'Add location',
    },
    {
      id: 'languages',
      label: 'Languages',
      description: 'Add languages you can communicate in.',
      completed: Boolean(profile?.languages && profile.languages.length > 0),
      weight: 10,
      actionLabel: 'Add languages',
    },
    {
      id: 'availability',
      label: 'Availability',
      description: 'Let others know when you are usually available.',
      completed: Boolean(profile?.availability),
      weight: 10,
      actionLabel: 'Add availability',
    },
    {
      id: 'offeredSkills',
      label: 'Skills you offer',
      description: 'Add at least one skill you can teach or share.',
      completed: skillsOffered.length > 0,
      weight: 25,
      actionLabel: 'Add skill',
    },
    {
      id: 'wantedSkills',
      label: 'Skills you want to learn',
      description: 'Add at least one skill you are looking for.',
      completed: skillsWanted.length > 0,
      weight: 20,
      actionLabel: 'Add learning goal',
    },
  ];

  const completionScore = completionItems.reduce(
    (total, item) => total + (item.completed ? item.weight : 0),
    0
  );

  const missingItems = completionItems.filter((item) => !item.completed);
  const contributionBalance = 2 - 1; // Mock: given - received
  const totalSessions = 3;
  const givenCount = 2;
  const receivedCount = 1;
  const points = 2840;
  const averageRating = 4.9;
  const totalReviews = 32;

  const rank = getRank(points);

  if (loading) {
    return <div className="p-10 text-center text-gray-500">Loading profile...</div>;
  }

  if (error || !profile) {
    return <div className="p-10 text-center text-red-600">{error || 'Profile not found.'}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="relative h-56 md:h-72">
        <img
          src={profile.cover_url || fallbackCover}
          alt="Cover"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative -mt-20 mb-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end">
            <div className="relative">
              <img
                src={profile.avatar_url || fallbackAvatar}
                alt={profile.full_name || 'Profile'}
                className="h-36 w-36 rounded-3xl border-4 border-white shadow-xl object-cover md:h-40 md:w-40"
              />
              {completionScore >= 70 && (
                <div className="absolute -bottom-2 -right-2 flex h-10 w-10 items-center justify-center rounded-full border-4 border-white bg-green-500">
                  <CheckCircle2 className="h-5 w-5 text-white" />
                </div>
              )}
            </div>

            <div className="flex-1 md:pb-3">
              <div className="mb-2 flex flex-col gap-3 md:flex-row md:items-center">
                <h1 className="text-3xl font-bold text-gray-900">
                  {profile.full_name || 'Unnamed user'}
                </h1>

                <span className="inline-flex w-fit items-center gap-1 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-3 py-1 text-sm font-semibold text-white">
                  <Award className="h-4 w-4" />
                  {rank}
                </span>
              </div>

              <p className="mb-3 max-w-2xl text-sm text-gray-700">
                {profile.headline || 'No headline added yet.'}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                {privacy?.show_location && profile.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {profile.location}
                  </span>
                )}

                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Member since {formatDate(profile.created_at)}
                </span>

                {privacy?.show_reviews && (
                  <span className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                    {averageRating || 'New'} ({totalReviews} reviews)
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-3 md:pb-3">
              <Button variant="outline" className="gap-2">
                <Share2 className="h-4 w-4" />
                Share
              </Button>

              <Button className="gap-2 bg-indigo-600 hover:bg-indigo-700">
                <MessageCircle className="h-4 w-4" />
                Message
              </Button>

              <Button variant="outline" className="gap-2">
                <Edit3 className="h-4 w-4" />
                Edit
              </Button>
            </div>
          </div>
        </div>

        <div className="mb-8 grid gap-6 lg:grid-cols-3">
          <Card className="p-6 lg:col-span-2">
            <div className="mb-4 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-indigo-600" />
              <h2 className="text-lg font-bold text-gray-900">About</h2>
            </div>

            <p className="leading-relaxed text-gray-700">
              {profile.bio || 'No bio added yet.'}
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {privacy?.show_languages && (
                <div className="rounded-2xl bg-gray-50 p-4">
                  <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-800">
                    <Languages className="h-4 w-4 text-indigo-600" />
                    Languages
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {profile.languages && profile.languages.length > 0 ? (
                      profile.languages.map((language) => (
                        <span
                          key={language}
                          className="rounded-full bg-white px-3 py-1 text-sm text-gray-700"
                        >
                          {language}
                        </span>
                      ))
                    ) : (
                      <span className="text-sm text-gray-500">No languages added.</span>
                    )}
                  </div>
                </div>
              )}

              {privacy?.show_availability && (
                <div className="rounded-2xl bg-gray-50 p-4">
                  <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-800">
                    <BookOpen className="h-4 w-4 text-indigo-600" />
                    Availability
                  </div>

                  <p className="text-sm text-gray-600">
                    {profile.availability || 'No availability added.'}
                  </p>
                </div>
              )}
            </div>
          </Card>

          <Card className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Profile Completion</h2>
                <p className="text-sm text-gray-500">Improves trust and visibility</p>
              </div>

              <span className="text-2xl font-bold text-indigo-600">{completionScore}%</span>
            </div>

            <div className="mb-4 h-3 overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-indigo-600 transition-all"
                style={{ width: `${completionScore}%` }}
              />
            </div>

            <p className="mb-4 text-sm text-gray-600">
              {getCompletionMessage(completionScore)}
            </p>

            {missingItems.length > 0 ? (
              <div className="space-y-3">
                {missingItems.map((item) => (
                  <div key={item.id} className="rounded-xl border border-amber-100 bg-amber-50 p-3">
                    <div className="flex gap-2">
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-amber-900">{item.label}</p>
                        <p className="text-xs text-amber-700">{item.description}</p>
                        <button className="mt-2 text-xs font-semibold text-indigo-600 hover:text-indigo-700">
                          {item.actionLabel}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-xl bg-green-50 p-3 text-sm text-green-700">
                Your profile is complete and ready for better matching.
              </div>
            )}
          </Card>
        </div>

        <div className="mb-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {privacy?.show_points && (
            <StatCard
              icon={<Award className="h-6 w-6" />}
              value={points.toLocaleString()}
              label="Total Points"
            />
          )}

          <StatCard
            icon={<BookOpen className="h-6 w-6" />}
            value={totalSessions.toString()}
            label="Completed Sessions"
          />

          <StatCard
            icon={<Gift className="h-6 w-6" />}
            value={givenCount.toString()}
            label="Given Sessions"
          />

          <StatCard
            icon={<GraduationCap className="h-6 w-6" />}
            value={receivedCount.toString()}
            label="Received Sessions"
          />
        </div>

        {privacy?.show_exchange_history && (
          <Card className="mb-8 p-6">
            <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Contribution Balance</h2>
                <p className="text-sm text-gray-500">
                  Encourages users to give knowledge, not only receive it.
                </p>
              </div>

              <span
                className={`w-fit rounded-full px-3 py-1 text-sm font-semibold ${
                  contributionBalance >= 0 ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'
                }`}
              >
                {contributionBalance >= 0 ? 'Positive contributor' : 'Needs more giving'}
              </span>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-green-100 bg-green-50 p-5">
                <div className="mb-3 flex items-center gap-2">
                  <Gift className="h-5 w-5 text-green-700" />
                  <h3 className="font-bold text-green-900">Skills Given</h3>
                </div>
                <p className="text-3xl font-bold text-green-900">{givenCount}</p>
                <p className="mt-1 text-sm text-green-700">
                  Sessions where this user helped others.
                </p>
              </div>

              <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5">
                <div className="mb-3 flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-blue-700" />
                  <h3 className="font-bold text-blue-900">Skills Received</h3>
                </div>
                <p className="text-3xl font-bold text-blue-900">{receivedCount}</p>
                <p className="mt-1 text-sm text-blue-700">
                  Sessions where this user learned from others.
                </p>
              </div>
            </div>
          </Card>
        )}

        <div className="flex gap-1 p-1 bg-gray-100 rounded-xl">
          {[
            { id: 'overview', label: 'Overview', icon: <BookOpen className="h-4 w-4" /> },
            { id: 'sessions', label: 'Sessions', icon: <BookOpen className="h-4 w-4" /> },
            { id: 'reviews', label: 'Reviews', icon: <Star className="h-4 w-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition ${
                activeTab === tab.id
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Skills I Teach</h2>
                <Button variant="outline" size="sm" className="gap-1">
                  <Plus className="h-4 w-4" />
                  Add
                </Button>
              </div>
              <div className="space-y-3">
                {skillsOffered.length === 0 ? (
                  <Card className="p-6 text-gray-500">No skills added yet.</Card>
                ) : (
                  skillsOffered.map((skill) => <SkillCard key={skill.id} skill={skill} type="offer" />)
                )}
              </div>
            </div>

            {privacy?.show_learning_skills && (
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">Skills I Want to Learn</h2>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Plus className="h-4 w-4" />
                    Add
                  </Button>
                </div>
                <div className="space-y-3">
                  {skillsWanted.length === 0 ? (
                    <Card className="p-6 text-gray-500">No skills added yet.</Card>
                  ) : (
                    skillsWanted.map((skill) => <SkillCard key={skill.id} skill={skill} type="learn" />)
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'sessions' && (
          <div className="space-y-4">
            <h2 className="mb-4 text-xl font-bold text-gray-900">Recent Sessions</h2>

            {sessions.length === 0 ? (
              <Card className="p-8 text-center text-gray-500">No completed sessions yet.</Card>
            ) : (
              sessions.map((session) => (
                <div
                  key={session.id}
                  className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:shadow-md"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <img
                      src={session.partnerImage || fallbackAvatar}
                      alt={session.partnerName}
                      className="h-14 w-14 rounded-xl object-cover"
                    />

                    <div className="flex-1">
                      <div className="mb-1 flex flex-wrap items-center gap-2">
                        <span className="font-semibold text-gray-900">{session.partnerName}</span>
                        <span className="text-sm text-gray-500">• {session.date}</span>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`rounded-full px-2 py-1 text-xs font-medium ${
                            session.type === 'given'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-blue-100 text-blue-700'
                          }`}
                        >
                          {session.type === 'given' ? 'You taught' : 'You learned'}
                        </span>

                        <span className="text-gray-700">{session.skill}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'reviews' && (
          <Card className="p-10 text-center">
            <Target className="mx-auto mb-3 h-10 w-10 text-indigo-500" />
            <h2 className="mb-2 text-xl font-bold text-gray-900">
              {privacy?.show_reviews ? 'Reviews' : 'Reviews are hidden'}
            </h2>
            <p className="text-gray-500">
              {privacy?.show_reviews
                ? `${totalReviews} reviews with an average rating of ${averageRating || 'New'}.`
                : 'This user chose not to show reviews publicly.'}
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

const StatCard = ({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) => (
  <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:shadow-md">
    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
      {icon}
    </div>
    <div className="mb-1 text-2xl font-bold text-gray-900">{value}</div>
    <div className="text-sm text-gray-500">{label}</div>
  </div>
);

const SkillCard = ({
  skill,
  type,
}: {
  skill: SkillItem;
  type: 'offer' | 'learn';
}) => (
  <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:shadow-md">
    <div className="mb-3 flex items-start justify-between gap-4">
      <div>
        <h3 className="font-semibold text-gray-900">{skill.name}</h3>
        <p className="text-sm text-gray-500">{skill.category}</p>
      </div>

      <span className={`rounded-full border px-3 py-1 text-xs font-medium ${getLevelColor(skill.level)}`}>
        {formatLevel(skill.level)}
      </span>
    </div>

    <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
      {type === 'learn' && (
        <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600">
          Looking for teachers
        </span>
      )}

      <span
        className={`rounded-full px-3 py-1 text-xs font-medium ${
          skill.isActive && skill.visibility === 'public'
            ? 'bg-green-50 text-green-700'
            : 'bg-gray-100 text-gray-500'
        }`}
      >
        {skill.isActive && skill.visibility === 'public' ? 'Visible' : 'Hidden'}
      </span>
    </div>
  </div>
);

const getLevelColor = (level: SkillLevel) => {
  const colors: Record<SkillLevel, string> = {
    beginner: 'bg-green-100 text-green-700 border-green-200',
    intermediate: 'bg-blue-100 text-blue-700 border-blue-200',
    advanced: 'bg-purple-100 text-purple-700 border-purple-200',
    expert: 'bg-amber-100 text-amber-700 border-amber-200',
  };

  return colors[level];
};

const formatLevel = (level: SkillLevel) => {
  return level.charAt(0).toUpperCase() + level.slice(1);
};

const getRank = (points: number) => {
  if (points >= 3000) return 'Platinum';
  if (points >= 1500) return 'Gold';
  if (points >= 500) return 'Silver';
  return 'Bronze';
};

const getCompletionMessage = (score: number) => {
  if (score >= 90) return 'Excellent profile. You are likely to appear higher in matches.';
  if (score >= 70) return 'Good profile. Complete the remaining items to increase visibility.';
  if (score >= 40) return 'Your profile needs more details to build trust.';
  return 'Complete your profile to start getting better matches.';
};

const formatDate = (date: string) => {
  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date));
};

export default ProfileSimple;
