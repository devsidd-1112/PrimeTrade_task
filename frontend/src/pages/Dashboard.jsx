import { useState, useEffect, useCallback } from 'react';
import Navbar from '../components/Navbar';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import Pagination from '../components/Pagination';
import taskService from '../services/taskService';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  // Pagination & Filters
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalTasks, setTotalTasks] = useState(0);
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    priority: '',
  });

  // Fetch tasks
  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const params = {
        page: currentPage,
        limit: 9,
        ...(filters.search && { search: filters.search }),
        ...(filters.status && { status: filters.status }),
        ...(filters.priority && { priority: filters.priority }),
      };

      const response = await taskService.getTasks(params);
      setTasks(response.data);
      setTotalPages(response.totalPages);
      setTotalTasks(response.totalTasks);
    } catch (error) {
      toast.error('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  }, [currentPage, filters.search, filters.status, filters.priority]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Handle search
  const handleSearch = (searchTerm) => {
    setFilters((prev) => ({ ...prev, search: searchTerm }));
    setCurrentPage(1);
  };

  // Handle filter change
  const handleFilterChange = (filterType, value) => {
    if (filterType === 'clear') {
      setFilters({ search: '', status: '', priority: '' });
    } else {
      setFilters((prev) => ({ ...prev, [filterType]: value }));
    }
    setCurrentPage(1);
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handle create/update task
  const handleTaskSubmit = async (taskData) => {
    setFormLoading(true);
    try {
      if (editingTask) {
        await taskService.updateTask(editingTask.id, taskData);
        toast.success('Task updated successfully');
      } else {
        await taskService.createTask(taskData);
        toast.success('Task created successfully');
      }
      setShowForm(false);
      setEditingTask(null);
      fetchTasks();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    } finally {
      setFormLoading(false);
    }
  };

  // Handle edit task
  const handleEdit = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  // Handle delete task
  const handleDelete = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    try {
      await taskService.deleteTask(taskId);
      toast.success('Task deleted successfully');
      fetchTasks();
    } catch (error) {
      toast.error('Failed to delete task');
    }
  };

  // Handle cancel form
  const handleCancelForm = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">My Tasks</h2>
            <p className="text-gray-600 mt-1">
              {totalTasks} {totalTasks === 1 ? 'task' : 'tasks'} total
            </p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition duration-200 font-medium"
          >
            + New Task
          </button>
        </div>

        {/* Search & Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="space-y-4">
            <SearchBar onSearch={handleSearch} />
            <FilterBar filters={filters} onFilterChange={handleFilterChange} />
          </div>
        </div>

        {/* Task Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                {editingTask ? 'Edit Task' : 'Create New Task'}
              </h3>
              <TaskForm
                task={editingTask}
                onSubmit={handleTaskSubmit}
                onCancel={handleCancelForm}
                loading={formLoading}
              />
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : tasks.length === 0 ? (
          /* Empty State */
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <svg
              className="mx-auto h-24 w-24 text-gray-400 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <h3 className="text-xl font-medium text-gray-800 mb-2">No tasks found</h3>
            <p className="text-gray-600 mb-4">
              {filters.search || filters.status || filters.priority
                ? 'Try adjusting your filters'
                : 'Get started by creating your first task'}
            </p>
            {!filters.search && !filters.status && !filters.priority && (
              <button
                onClick={() => setShowForm(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition duration-200"
              >
                Create Task
              </button>
            )}
          </div>
        ) : (
          /* Task Grid */
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
