const TaskCard = ({ task, onEdit, onDelete }) => {
  // Status badge colors
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
  };

  // Priority badge colors
  const priorityColors = {
    low: 'bg-gray-100 text-gray-800',
    medium: 'bg-orange-100 text-orange-800',
    high: 'bg-red-100 text-red-800',
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-200">
      {/* Title */}
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{task.title}</h3>

      {/* Description */}
      <p className="text-gray-600 mb-4">{task.description || 'No description'}</p>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            statusColors[task.status]
          }`}
        >
          {task.status}
        </span>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            priorityColors[task.priority]
          }`}
        >
          {task.priority}
        </span>
      </div>

      {/* Date */}
      <p className="text-sm text-gray-500 mb-4">
        Created: {formatDate(task.createdAt)}
      </p>

      {/* Actions */}
      <div className="flex space-x-2">
        <button
          onClick={() => onEdit(task)}
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-200"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-200"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
