import Navbar from './Unavbar'
import Footer from './Ufooter'
import React, { useState, useEffect } from 'react';

const Umembers = () => {
  const [members, setMembers] = useState([]);
    const [name, setName] = useState('');
    const [designation, setDesignation] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [membersPerPage] = useState(5);

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
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Members</h1>
      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        className="mb-4 px-4 py-2 w-full border rounded-lg"
      />

      <div className="overflow-x-auto top">
        <table data-aos="fade-up" className="min-w-full border-collapse border border-gray-300 mb-5">
          <thead>
            <tr className="bg-orange-500 text-white">
              <th className="py-2 px-4 border border-gray-300">Sr no</th>
              <th className="py-2 px-4 border border-gray-300">Name</th>
              <th className="py-2 px-4 border border-gray-300">Designation</th>
            </tr>
          </thead>
          <tbody>
            {currentMembers.map((member, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-orange-100"}>
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
            className={`px-4 py-2 border border-gray-300 ${currentPage === index + 1 ? 'bg-orange-500 text-white' : 'bg-white text-orange-500'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
      </div>
      <Footer />
    </div>
  )
}

export default Umembers