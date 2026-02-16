import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, 
  MapPin, 
  Clock, 
  Users, 
  BookOpen, 
  Lightbulb,
  ArrowRight,
  Github,
  Linkedin
} from 'lucide-react';

const About: React.FC = () => {
  const teamMembers = [
    {
      id: 1,
      name: 'Kishan Bhandary',
      title: 'Developer',
      specialization: 'Creator of InnoYatra',
      photo: '/kishan.jpeg',
      github: 'https://github.com/kishanbhandary',
      linkedin: 'https://linkedin.com/in/kishanbhandary',
    },
    {
      id: 2,
      name: 'Mr. Lokesh',
      title: 'Mentor',
      specialization: 'Project Mentor & Guide',
      photo: '/lokesh.jpg',
      github: '',
      linkedin: '',
    }
  ];

  const researchAreas = [
    'Artificial Intelligence & Machine Learning',
    'Blockchain & Web3',
    'Internet of Things (IoT)',
    'Cybersecurity',
    'Full-Stack Web Development',
    'Data Science & Analytics',
    'Mobile App Development',
    'Cloud & DevOps',
    'Game Development',
    'Open Source & Research'
  ];

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About InnoYatra
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 max-w-4xl mx-auto leading-relaxed">
              InnoYatra is a student innovation portal that brings together projects, 
              prototypes, and research from aspiring engineers. It's a launchpad for ideas 
              that solve real problems using cutting-edge technology.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Mission and Vision */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-primary-600 rounded-lg mr-4">
                  <Lightbulb className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Our Mission
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                To empower students to turn ideas into impactful projects by providing 
                a platform to build, document, share, and collaborate on technology 
                solutions that matter.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-green-600 rounded-lg mr-4">
                  <Lightbulb className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Our Vision
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                To be the go-to destination for student innovation — a vibrant ecosystem 
                where every project finds its audience, every student finds inspiration, 
                and every idea gets the recognition it deserves.
              </p>
            </div>
          </div>
        </section>

        {/* Project Domains */}
        <section className="mb-20">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center mb-8">
              <div className="p-3 bg-blue-600 rounded-lg mr-4">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Project Domains
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              InnoYatra hosts projects across a wide range of technology domains. 
              Here are the focus areas students are building in.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {researchAreas.map((area, index) => (
                <div
                  key={index}
                  className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
                >
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {area}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Faculty */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-center">
              <Users className="h-8 w-8 text-primary-600 mr-3" />
              Our Team
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              The people behind InnoYatra
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow"
              >
                <div className="w-28 h-28 mx-auto mb-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&size=150&background=4f46e5&color=fff`;
                    }}
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mb-2">
                  {member.title}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-5">
                  {member.specialization}
                </p>
                <div className="flex items-center justify-center space-x-4">
                  {member.github && (
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors text-sm"
                  >
                    <Github className="h-4 w-4" />
                    GitHub
                  </a>
                  )}
                  {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  >
                    <Linkedin className="h-4 w-4" />
                    LinkedIn
                  </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Information */}
        <section className="mb-20">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Get in Touch
              </h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                  <span className="text-gray-700 dark:text-gray-300">
                    InnoYatra Student Innovation Portal
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                  <span className="text-gray-700 dark:text-gray-300">
                    contact@innoyatra.in
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Available 24/7 online
                  </span>
                </div>
              </div>
          </div>
        </section>

        {/* Project Portal Information */}
        <section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg p-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">
              About This Portal
            </h2>
            <p className="text-xl text-primary-100 mb-6 max-w-3xl mx-auto">
              InnoYatra is built to celebrate student creativity. It provides a space to document work, 
              share knowledge, inspire peers, and demonstrate real-world application of engineering skills.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link
                to="/projects"
                className="inline-flex items-center px-6 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
              >
                Explore Projects
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link
                to="/categories"
                className="inline-flex items-center px-6 py-3 border border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary-600 transition-colors"
              >
                Browse Categories
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;