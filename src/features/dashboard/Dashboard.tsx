// src/features/dashboard/Dashboard.tsx

import React, { useEffect, useState } from 'react';
import Card from '../../components/ui/Card';
import OnboardingModal from '../profile/OnboardingModal';
import { supabase } from '../../services/supabase/client';

const Dashboard: React.FC = () => {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [checkingProfile, setCheckingProfile] = useState(true);

  const skillsGiven = [
    { id: '1', name: 'JavaScript', receiver: 'John Doe' },
    { id: '2', name: 'React', receiver: 'Jane Smith' },
  ];

  const skillsReceived = [
    { id: '3', name: 'Python', giver: 'Bob Johnson' },
    { id: '4', name: 'Design', giver: 'Alice Brown' },
  ];

  useEffect(() => {
    checkOnboardingStatus();
  }, []);

  const checkOnboardingStatus = async () => {
    try {
      setCheckingProfile(true);

      const { data: authData, error: authError } = await supabase.auth.getUser();

      if (authError || !authData.user) {
        setShowOnboarding(false);
        return;
      }

      const userId = authData.user.id;

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('profile_completed, onboarding_dismissed')
        .eq('id', userId)
        .maybeSingle();

      if (profileError) {
        console.error('Profile check error:', profileError);
        // If permission denied (RLS policy issue), show onboarding anyway
        if (profileError.code === '42501') {
          console.warn('RLS Policy error: Please set up profiles table permissions in Supabase');
          setShowOnboarding(true);
        } else {
          setShowOnboarding(false);
        }
        return;
      }

      if (!profile) {
        const { error: insertError } = await supabase.from('profiles').insert({
          id: userId,
          full_name:
            authData.user.user_metadata?.full_name ||
            authData.user.user_metadata?.name ||
            '',
          profile_completed: false,
          onboarding_dismissed: false,
        });

        if (insertError) {
          console.error('Create profile error:', insertError);
          setShowOnboarding(false);
          return;
        }

        setShowOnboarding(true);
        return;
      }

      setShowOnboarding(
        profile.profile_completed === false &&
          profile.onboarding_dismissed === false
      );
    } catch (error) {
      console.error('Onboarding status error:', error);
      setShowOnboarding(false);
    } finally {
      setCheckingProfile(false);
    }
  };

  const handleOnboardingSave = async () => {
    setShowOnboarding(false);
    await checkOnboardingStatus();
  };

  const handleOnboardingClose = () => {
    // Later: hide only now, do not save anything.
    setShowOnboarding(false);
  };

  const handleOnboardingDismiss = () => {
    // OnboardingModal updates onboarding_dismissed = true.
    setShowOnboarding(false);
  };

  return (
    <div className="space-y-6">
      <OnboardingModal
        isOpen={showOnboarding}
        onClose={handleOnboardingClose}
        onDismiss={handleOnboardingDismiss}
        onSave={handleOnboardingSave}
      />

      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-500">
          Track your giving, learning, and upcoming skill exchanges.
        </p>
      </div>

      {checkingProfile && (
        <Card className="p-4">
          <p className="text-sm text-gray-500">Checking your profile setup...</p>
        </Card>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <h2 className="mb-4 text-xl font-semibold">Skills Given</h2>
          <ul className="space-y-2">
            {skillsGiven.map((skill) => (
              <li
                key={skill.id}
                className="flex items-center justify-between rounded bg-gray-50 p-2"
              >
                <span>{skill.name}</span>
                <span className="text-sm text-gray-600">to {skill.receiver}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <h2 className="mb-4 text-xl font-semibold">Skills Received</h2>
          <ul className="space-y-2">
            {skillsReceived.map((skill) => (
              <li
                key={skill.id}
                className="flex items-center justify-between rounded bg-gray-50 p-2"
              >
                <span>{skill.name}</span>
                <span className="text-sm text-gray-600">from {skill.giver}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;