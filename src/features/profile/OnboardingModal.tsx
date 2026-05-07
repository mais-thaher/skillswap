// src/features/profile/OnboardingModal.tsx
// Professional onboarding modal

import React, { useState } from 'react';
import {
  X,
  User,
  MapPin,
  Globe,
  Award,
  Target,
  Clock,
  Sparkles,
} from 'lucide-react';
import { supabase } from '../../services/supabase/client';

// Export types
export type OnboardingFormData = {
  fullName: string;
  bio: string;
  location: string;
  languages: string;
  skillsOffered: string;
  skillsWanted: string;
  availability: string;
};

export type OnboardingModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onDismiss: () => void;
  onSave: (data: OnboardingFormData) => void | Promise<void>;
};

const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
  onDismiss,
  onSave,
}) => {
  const [formData, setFormData] = useState<OnboardingFormData>({
    fullName: '',
    bio: '',
    location: '',
    languages: '',
    skillsOffered: '',
    skillsWanted: '',
    availability: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof OnboardingFormData, string>>>({});
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleInputChange = (field: keyof OnboardingFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setSubmitError('');

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof OnboardingFormData, string>> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.skillsOffered.trim()) {
      newErrors.skillsOffered = 'Add at least one skill you can offer';
    }

    if (!formData.skillsWanted.trim()) {
      newErrors.skillsWanted = 'Add at least one skill you want to learn';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const splitCommaValues = (value: string) => {
    return value
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
  };

  const upsertSkill = async (skillName: string) => {
    const normalizedName = skillName.trim();

    const { data: existingSkill, error: findError } = await supabase
      .from('skills')
      .select('id')
      .ilike('name', normalizedName)
      .maybeSingle();

    if (findError) {
      throw findError;
    }

    if (existingSkill?.id) {
      return existingSkill.id as string;
    }

    const { data: newSkill, error: insertError } = await supabase
      .from('skills')
      .insert({
        name: normalizedName,
        category: 'General',
        status: 'approved',
      })
      .select('id')
      .single();

    if (insertError) {
      throw insertError;
    }

    return newSkill.id as string;
  };

  const saveUserSkills = async (
    userId: string,
    skillNames: string[],
    type: 'offer' | 'learn'
  ) => {
    for (const skillName of skillNames) {
      const skillId = await upsertSkill(skillName);

      const { error } = await supabase.from('user_skills').upsert(
        {
          user_id: userId,
          skill_id: skillId,
          type,
          level: 'beginner',
          description: null,
          is_active: true,
          visibility: 'public',
        },
        {
          onConflict: 'user_id,skill_id,type',
        }
      );

      if (error) {
        throw error;
      }
    }
  };

  const saveToDatabase = async (data: OnboardingFormData): Promise<boolean> => {
    const { data: authData, error: authError } = await supabase.auth.getUser();

    if (authError || !authData.user) {
      setSubmitError('You must be logged in to complete your profile.');
      return false;
    }

    const userId = authData.user.id;
    const offeredSkills = splitCommaValues(data.skillsOffered);
    const wantedSkills = splitCommaValues(data.skillsWanted);
    const languages = splitCommaValues(data.languages);

    const { error: profileError } = await supabase
      .from('profiles')
      .update({
        full_name: data.fullName.trim(),
        bio: data.bio.trim() || null,
        location: data.location.trim() || null,
        languages,
        availability: data.availability || null,
        profile_completed: true,
        onboarding_dismissed: false,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId);

    if (profileError) {
      throw profileError;
    }

    await saveUserSkills(userId, offeredSkills, 'offer');
    await saveUserSkills(userId, wantedSkills, 'learn');

    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      setSubmitError('');

      const savedSuccessfully = await saveToDatabase(formData);

      if (savedSuccessfully) {
        await onSave(formData);
      }
    } catch (error) {
      console.error('Onboarding save error:', error);
      setSubmitError('Could not save your profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setErrors({});
    setSubmitError('');
    onClose();
  };

  const handleDismiss = async () => {
    try {
      setErrors({});
      setSubmitError('');

      const { data: authData } = await supabase.auth.getUser();

      if (authData.user) {
        await supabase
          .from('profiles')
          .update({
            onboarding_dismissed: true,
            updated_at: new Date().toISOString(),
          })
          .eq('id', authData.user.id);
      }

      onDismiss();
    } catch (error) {
      console.error('Dismiss onboarding error:', error);
      onDismiss();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-3xl bg-white shadow-2xl shadow-indigo-500/20">
        <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-6 sm:p-8">
          <button
            onClick={handleClose}
            className="absolute right-4 top-4 rounded-xl p-2 text-white/80 transition-all hover:bg-white/20 hover:text-white"
            aria-label="Close onboarding"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
              <Sparkles className="h-6 w-6 text-white" />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                Welcome to SkillSwap
              </h2>
              <p className="text-sm text-white/80 sm:text-base">
                Complete your profile to get better skill matches.
              </p>
            </div>
          </div>
        </div>

        <div className="max-h-[calc(90vh-190px)] overflow-y-auto p-6 sm:p-8">
          {submitError && (
            <div className="mb-5 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
              {submitError}
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-900">
                <User className="h-4 w-4 text-indigo-600" />
                Full Name *
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                placeholder="Enter your full name"
                className={`w-full rounded-xl border px-4 py-3 transition-all focus:outline-none ${
                  errors.fullName
                    ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                    : 'border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
                }`}
              />
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
              )}
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-900">
                <User className="h-4 w-4 text-indigo-600" />
                Short Bio
              </label>
              <textarea
                value={formData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                placeholder="Tell others who you are and what you can help with..."
                rows={3}
                className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 transition-all focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-900">
                <MapPin className="h-4 w-4 text-indigo-600" />
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="City, Country"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 transition-all focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-900">
                <Globe className="h-4 w-4 text-indigo-600" />
                Languages
              </label>
              <input
                type="text"
                value={formData.languages}
                onChange={(e) => handleInputChange('languages', e.target.value)}
                placeholder="English, Arabic, Spanish"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 transition-all focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
              <p className="mt-1 text-xs text-gray-500">
                Separate languages with commas.
              </p>
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-900">
                <Award className="h-4 w-4 text-indigo-600" />
                Skills I Can Offer *
              </label>
              <textarea
                value={formData.skillsOffered}
                onChange={(e) => handleInputChange('skillsOffered', e.target.value)}
                placeholder="React, Arabic, Photoshop, Guitar"
                rows={3}
                className={`w-full resize-none rounded-xl border px-4 py-3 transition-all focus:outline-none ${
                  errors.skillsOffered
                    ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                    : 'border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
                }`}
              />
              <p className="mt-1 text-xs text-gray-500">
                Separate skills with commas.
              </p>
              {errors.skillsOffered && (
                <p className="mt-1 text-sm text-red-600">{errors.skillsOffered}</p>
              )}
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-900">
                <Target className="h-4 w-4 text-indigo-600" />
                Skills I Want to Learn *
              </label>
              <textarea
                value={formData.skillsWanted}
                onChange={(e) => handleInputChange('skillsWanted', e.target.value)}
                placeholder="Public speaking, Python, Photography"
                rows={3}
                className={`w-full resize-none rounded-xl border px-4 py-3 transition-all focus:outline-none ${
                  errors.skillsWanted
                    ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                    : 'border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
                }`}
              />
              <p className="mt-1 text-xs text-gray-500">
                Separate skills with commas.
              </p>
              {errors.skillsWanted && (
                <p className="mt-1 text-sm text-red-600">{errors.skillsWanted}</p>
              )}
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-900">
                <Clock className="h-4 w-4 text-indigo-600" />
                Availability
              </label>
              <select
                value={formData.availability}
                onChange={(e) => handleInputChange('availability', e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 transition-all focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              >
                <option value="">Select availability</option>
                <option value="weekdays">Weekdays</option>
                <option value="weekends">Weekends</option>
                <option value="evenings">Evenings</option>
                <option value="flexible">Flexible</option>
              </select>
            </div>
          </div>

          <div className="mt-8 space-y-3">
            <button
              onClick={handleSave}
              disabled={isSubmitting}
              className="w-full rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 py-4 font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/30 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Saving...
                </span>
              ) : (
                'Save Profile'
              )}
            </button>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleClose}
                disabled={isSubmitting}
                className="rounded-xl bg-gray-100 px-4 py-3 font-medium text-gray-700 transition-all hover:bg-gray-200 disabled:opacity-50"
              >
                Later
              </button>

              <button
                onClick={handleDismiss}
                disabled={isSubmitting}
                className="rounded-xl px-4 py-3 font-medium text-gray-500 transition-all hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50"
              >
                Don&apos;t remind me
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingModal;