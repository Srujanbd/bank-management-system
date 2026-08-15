import { useState } from "react";

function AdminProfile() {

    const [editing, setEditing] = useState(false);

    const [profile, setProfile] = useState({
        name: "Admin",
        role: "Bank Manager",
        email: "admin@banksys.com",
        phone: "+91 9876543210"
    });

    const [form, setForm] = useState(profile);

    const handleChange = (e) => {

        const { name, value } = e.target;

        setForm({
            ...form,
            [name]: value
        });
    };

    const handleSave = () => {

        setProfile(form);
        setEditing(false);
    };

    return (
        <div className="admin-profile-page">

            <div className="page-header">

                <div>
                    <h2>Admin Profile</h2>

                    <p>
                        Manage your administrator profile
                    </p>
                </div>

            </div>

            <div className="profile-card">

                <div className="profile-card-header">

                    <div className="profile-large-avatar">
                        {profile.name.charAt(0).toUpperCase()}
                    </div>

                    <div>
                        <h3>{profile.name}</h3>

                        <p>
                            {profile.role}
                        </p>
                    </div>

                </div>


                {!editing ? (

                    <div className="profile-details">

                        <div className="profile-detail">

                            <span>
                                Full Name
                            </span>

                            <strong>
                                {profile.name}
                            </strong>

                        </div>

                        <div className="profile-detail">

                            <span>
                                Role
                            </span>

                            <strong>
                                {profile.role}
                            </strong>

                        </div>

                        <div className="profile-detail">

                            <span>
                                Email
                            </span>

                            <strong>
                                {profile.email}
                            </strong>

                        </div>

                        <div className="profile-detail">

                            <span>
                                Phone
                            </span>

                            <strong>
                                {profile.phone}
                            </strong>

                        </div>

                        <button
                            className="primary-btn"
                            onClick={() => setEditing(true)}
                        >
                            Edit Profile
                        </button>

                    </div>

                ) : (

                    <div className="profile-form">

                        <div className="form-group">

                            <label>
                                Full Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="form-group">

                            <label>
                                Role
                            </label>

                            <input
                                type="text"
                                name="role"
                                value={form.role}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="form-group">

                            <label>
                                Email
                            </label>

                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="form-group">

                            <label>
                                Phone
                            </label>

                            <input
                                type="text"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="form-actions">

                            <button
                                className="secondary-btn"
                                onClick={() => {
                                    setForm(profile);
                                    setEditing(false);
                                }}
                            >
                                Cancel
                            </button>

                            <button
                                className="primary-btn"
                                onClick={handleSave}
                            >
                                Save Changes
                            </button>

                        </div>

                    </div>

                )}

            </div>

        </div>
    );
}

export default AdminProfile;