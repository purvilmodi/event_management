import React, { useState, useEffect } from 'react';

function Members() {
  const [members, setMembers] = useState([]);
  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [membersPerPage] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const designations = ['Manager', 'Developer', 'Designer', 'Tester', 'Analyst']; 

  useEffect(() => {
    fetch('http://localhost:5000/api/members')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setMembers(data))
      .catch(error => console.error('Error fetching members:', error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/members', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, designation }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const newMember = await response.json();
      setMembers([...members, newMember]);
      setName('');
      setDesignation('');
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error adding member:', error);
    }
  };

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    setCurrentPage(1);
  };

  // PAGINATION: Calculate current members
  const indexOfLastMember = currentPage * membersPerPage;
  const indexOfFirstMember = indexOfLastMember - membersPerPage;
  const currentMembers = members
    .filter(member => member.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .slice(indexOfFirstMember, indexOfLastMember);

  // PAGINATION: Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Members</h1>
      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        className="mb-4 px-4 py-2 w-full border rounded-lg"
      />

      {/* Add Member Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-gray-700 text-white px-4 py-2 rounded-lg mb-4 hover:bg-gray-900"
      >
        Add Member
      </button>

      <div className="overflow-x-auto top">
        <table className="min-w-full border-collapse border border-gray-300 mb-5">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="py-2 px-4 border border-gray-300">Sr no</th>
              <th className="py-2 px-4 border border-gray-300">Name</th>
              <th className="py-2 px-4 border border-gray-300">Designation</th>
            </tr>
          </thead>
          <tbody>
            {currentMembers.map((member, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-gray-300" : "bg-white"}>
                <td className="py-2 px-4 border border-gray-300">{index + 1 + (currentPage - 1) * membersPerPage}</td>
                <td className="py-2 px-4 border border-gray-300">{member.name}</td>
                <td className="py-2 px-4 border border-gray-300">{member.designation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* PAGINATION: Page numbers */}
      <div className="flex justify-center mt-4 mb-4">
        {Array.from({ length: Math.ceil(members.length / membersPerPage) }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`px-4 py-2 border border-gray-300 ${currentPage === index + 1 ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Add Member Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 backdrop-blur-md bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 font-semibold text-2xl rounded-full px-2 py-1"
            >
              X
            </button>
            <h2 className="text-xl font-bold text-center mb-4">Add Members</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                  required
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="designation" className="block text-gray-700 mb-1">Designation</label>
                <select
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="" disabled>Select Designation</option>
                  {designations.map((designation, index) => (
                    <option key={index} value={designation}>
                      {designation}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white rounded-lg py-2 font-medium hover:bg-blue-700 transition"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Members;
