import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";



function AdminBio(){
    const [admin, setAdmin] = useState(null) 
    let {id} = useParams();
    let adminId = parseInt(id)

    useEffect(() => {
        fetch(`/admins/${adminId}`)
          .then((r) => r.json())
          .then((admin) => setAdmin(admin));
      }, []);

      if (admin === null) {
        return null;
      }
      
      return (
        <div className="admin-bio-container">
          <h1 className="admin-name">AdminBio for {admin.username}</h1>
          <p className="admin-position">Position: {admin.position}</p>
          <p className="admin-email">{admin.email}</p>
          <img className="admin-avatar" src={admin.image_url} alt="employee avatar" />
        </div>
      );
}

export default AdminBio 