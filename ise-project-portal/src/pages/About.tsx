import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Users, 
  Award, 
  BookOpen, 
  Lightbulb,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

const About: React.FC = () => {
  const facultyMembers = [
    {
      id: 1,
      name: 'Dr. Vikram Nair',
      title: 'Associate Professor & Head of Department',
      specialization: 'Machine Learning, Data Science',
      email: 'vikram.nair@university.ac.in',
      image: '/api/placeholder/150/150'
    },
    {
      id: 2,
      name: 'Dr. Meera Joshi',
      title: 'Professor',
      specialization: 'Blockchain Technology, Cybersecurity',
      email: 'meera.joshi@university.ac.in',
      image: '/api/placeholder/150/150'
    },
    {
      id: 3,
      name: 'Dr. Rajesh Kumar',
      title: 'Assistant Professor',
      specialization: 'Artificial Intelligence, NLP',
      email: 'rajesh.kumar@university.ac.in',
      image: '/api/placeholder/150/150'
    },
    {
      id: 4,
      name: 'Dr. Sunita Rani',
      title: 'Associate Professor',
      specialization: 'Software Engineering, IoT',
      email: 'sunita.rani@university.ac.in',
      image: '/api/placeholder/150/150'
    }
  ];

  const achievements = [
    {
      year: '2024',
      title: 'Best Department Award',
      description: 'Recognized for excellence in academic innovation and student outcomes'
    },
    {
      year: '2023',
      title: 'Research Excellence',
      description: '15+ research papers published in top-tier conferences and journals'
    },
    {
      year: '2023',
      title: 'Industry Partnerships',
      description: 'Established collaborations with 20+ leading technology companies'
    },
    {
      year: '2022',
      title: 'Student Achievements',
      description: '95% placement rate with average package of 8.5 LPA'
    }
  ];

  const researchAreas = [
    'Artificial Intelligence & Machine Learning',
    'Blockchain & Distributed Systems',
    'Internet of Things (IoT)',
    'Cybersecurity & Privacy',
    'Software Engineering',
    'Data Science & Analytics',
    'Computer Vision',
    'Natural Language Processing',
    'Cloud Computing',
    'Mobile Application Development'
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About Our Department
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 max-w-4xl mx-auto leading-relaxed">
              The Information Science and Engineering Department is at the forefront of 
              technological innovation, fostering the next generation of computer scientists 
              and engineers through cutting-edge research and hands-on learning experiences.
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
                To provide world-class education in information science and engineering, 
                conduct innovative research that addresses real-world challenges, and 
                foster an environment of creativity and collaboration that prepares 
                students for successful careers in technology and research.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-green-600 rounded-lg mr-4">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Our Vision
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                To be recognized globally as a premier department that bridges the gap 
                between theoretical knowledge and practical application, producing 
                graduates who are industry-ready and research-oriented, capable of 
                driving technological advancement and societal progress.
              </p>
            </div>
          </div>
        </section>

        {/* Department Stats */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Department at a Glance
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Our achievements and impact in numbers
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center shadow-md border border-gray-200 dark:border-gray-700">
              <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                1500+
              </div>
              <div className="text-gray-600 dark:text-gray-400">Students</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center shadow-md border border-gray-200 dark:border-gray-700">
              <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                50+
              </div>
              <div className="text-gray-600 dark:text-gray-400">Faculty Members</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center shadow-md border border-gray-200 dark:border-gray-700">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                100+
              </div>
              <div className="text-gray-600 dark:text-gray-400">Research Papers</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center shadow-md border border-gray-200 dark:border-gray-700">
              <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                25+
              </div>
              <div className="text-gray-600 dark:text-gray-400">Years of Excellence</div>
            </div>
          </div>
        </section>

        {/* Research Areas */}
        <section className="mb-20">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center mb-8">
              <div className="p-3 bg-blue-600 rounded-lg mr-4">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Research Areas
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Our faculty and students are actively engaged in cutting-edge research across 
              multiple domains of computer science and engineering.
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
              Our Faculty
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Meet our distinguished faculty members who are leaders in their respective fields
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {facultyMembers.map((faculty) => (
              <div
                key={faculty.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow"
              >
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <img
                    src={faculty.image}
                    alt={faculty.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  {faculty.name}
                </h3>
                <p className="text-sm text-primary-600 dark:text-primary-400 mb-2">
                  {faculty.title}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {faculty.specialization}
                </p>
                <a
                  href={`mailto:${faculty.email}`}
                  className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Contact
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Achievements */}
        <section className="mb-20">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Recent Achievements
            </h2>
            <div className="space-y-6">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {achievement.year}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      {achievement.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {achievement.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Contact Information
              </h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Information Science and Engineering Department<br />
                    University Campus, Academic Block A, Floor 3<br />
                    City, State - 560001
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                  <span className="text-gray-700 dark:text-gray-300">
                    +91 80 2345 6789
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                  <span className="text-gray-700 dark:text-gray-300">
                    ise@university.ac.in
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Monday - Friday: 9:00 AM - 5:00 PM
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Quick Links
              </h2>
              <div className="space-y-4">
                <Link
                  to="/projects"
                  className="flex items-center justify-between p-3 bg-primary-50 dark:bg-primary-900/20 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors group"
                >
                  <span className="text-gray-900 dark:text-white font-medium">
                    Browse Student Projects
                  </span>
                  <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors" />
                </Link>
                <a
                  href="https://university.ac.in/admissions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors group"
                >
                  <span className="text-gray-900 dark:text-white font-medium">
                    Admission Information
                  </span>
                  <ExternalLink className="h-5 w-5 text-gray-400 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors" />
                </a>
                <a
                  href="https://university.ac.in/research"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors group"
                >
                  <span className="text-gray-900 dark:text-white font-medium">
                    Research Opportunities
                  </span>
                  <ExternalLink className="h-5 w-5 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                </a>
                <a
                  href="https://university.ac.in/careers"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors group"
                >
                  <span className="text-gray-900 dark:text-white font-medium">
                    Career Opportunities
                  </span>
                  <ExternalLink className="h-5 w-5 text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Project Portal Information */}
        <section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg p-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">
              About This Projects Portal
            </h2>
            <p className="text-xl text-primary-100 mb-6 max-w-3xl mx-auto">
              This portal serves as a showcase for the innovative work being done by our students. 
              It provides a platform to share knowledge, inspire collaboration, and demonstrate 
              the practical application of theoretical concepts learned in the classroom.
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