// src/features/dashboard/Dashboard.tsx

import React from 'react';
import Card from '../../components/ui/Card';

const Dashboard: React.FC = () => {
  // Placeholder data
  const skillsGiven = [
    { id: '1', name: 'JavaScript', receiver: 'John Doe' },
    { id: '2', name: 'React', receiver: 'Jane Smith' },
  ];

  const skillsReceived = [
    { id: '3', name: 'Python', giver: 'Bob Johnson' },
    { id: '4', name: 'Design', giver: 'Alice Brown' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-xl font-semibold mb-4">Skills Given</h2>
          <ul className="space-y-2">
            {skillsGiven.map((skill) => (
              <li key={skill.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span>{skill.name}</span>
                <span className="text-sm text-gray-600">to {skill.receiver}</span>
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          <h2 className="text-xl font-semibold mb-4">Skills Received</h2>
          <ul className="space-y-2">
            {skillsReceived.map((skill) => (
              <li key={skill.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
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