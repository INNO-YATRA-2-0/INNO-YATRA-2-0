import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, Grid, List } from 'lucide-react';
import { ProjectCard, SearchBar, Pagination } from '../components';
import { useProjects } from '../hooks';

const Projects: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    projects,
    filteredCount,
    totalCount,
    pagination,
    filters,
    updateFilters,
    updateQuery,
    setCurrentPage,
  } = useProjects();

  // Sync URL params with filters on mount
  useEffect(() => {
    const urlFilters = {
      query: searchParams.get('q') || '',
      category: searchParams.get('category') || 'all',
      year: searchParams.get('year') || 'all',
      batch: searchParams.get('batch') || 'all',
      status: searchParams.get('status') || 'all',
    };

    updateFilters(urlFilters);
    if (urlFilters.query) {
      updateQuery(urlFilters.query);
    }

    const page = parseInt(searchParams.get('page') || '1', 10);
    if (page > 1) {
      setCurrentPage(page);
    }
  }, [searchParams]);

  // Update URL when filters change
  const handleFiltersChange = (newFilters: Partial<typeof filters>) => {
    updateFilters(newFilters);
    const params = new URLSearchParams(searchParams);
    
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value && value !== 'all') {
        params.set(key === 'query' ? 'q' : key, value);
      } else {
        params.delete(key === 'query' ? 'q' : key);
      }
    });

    params.delete('page'); // Reset to first page when filtering
    setSearchParams(params);
  };

  const handleQueryChange = (query: string) => {
    updateQuery(query);
    const params = new URLSearchParams(searchParams);
    
    if (query) {
      params.set('q', query);
    } else {
      params.delete('q');
    }
    
    params.delete('page'); // Reset to first page when searching
    setSearchParams(params);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const params = new URLSearchParams(searchParams);
    
    if (page > 1) {
      params.set('page', page.toString());
    } else {
      params.delete('page');
    }
    
    setSearchParams(params);
    
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Projects
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Discover innovative projects built by students on InnoYatra
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <SearchBar
            filters={filters}
            onFiltersChange={handleFiltersChange}
            onQueryChange={handleQueryChange}
            resultsCount={filteredCount}
            totalCount={totalCount}
          />
        </div>

        {/* Controls Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 space-y-4 sm:space-y-0">
          {/* View Toggle (placeholder for future grid/list view) */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">View:</span>
            <div className="flex border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
              <button className="px-3 py-2 bg-primary-600 text-white">
                <Grid className="h-4 w-4" />
              </button>
              <button className="px-3 py-2 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        {filteredCount === 0 ? (
          <div className="text-center py-16">
            <div className="w-32 h-32 mx-auto mb-6 text-gray-300 dark:text-gray-600">
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              No projects found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Try adjusting your search criteria or browse all projects
            </p>
            <button
              onClick={() => {
                handleFiltersChange({
                  query: '',
                  category: 'all',
                  year: 'all',
                  batch: 'all',
                });
                handleQueryChange('');
              }}
              className="inline-flex items-center px-4 py-2 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Clear all filters
            </button>
          </div>
        ) : (
          <>
            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {projects.map((project) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                />
              ))}
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
              totalItems={pagination.totalItems}
              itemsPerPage={pagination.itemsPerPage}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Projects;