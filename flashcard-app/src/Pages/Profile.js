import React,{useContext,useState} from "react";
import { AuthContext } from "../Context/AuthContext";
import './Profile.css';

const Profile = () =>{
    const { currentUser, updateUser } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        name:currentUser?.name || '',
        birthday: currentUser?.birthday || '',
        gender: currentUser?.gender || '',
        bio: currentUser?.bio || ''
    });

    const submitHandler = (e)=>{
        e.preventDefault();
        updateUser(formData);
    };

    return(
        <div className="profile-container">
            <div className="row">
                {/* left column profile form */}
                <div className="col-lg mb-4">
                    <div className="card profile-card">
                        <div className="card-body text-center">
                            <div className="profile-avatar mb-3">
                                {formData.gender ==='male'?(
                                    <i className="bi bi-person-circle display-4 text-primary"></i>
                                ):formData.gender === 'female'?(
                                    <i className="bi bi-person-circle display-4 text-danger"></i>
                                ):(
                                    <i className="bi bi-person-circle display-4 text-secondary"></i>
                                )}
                            </div>
                            <h3 className="profile-name">{formData.name || 'Anonymous'}</h3>
                            <p className="text-muted">Flashcard Learner</p>
                            <hr/>
                            <div className="profile-info">
                                <p>
                                    <i className="bi bi-gender-ambigous me-2"></i>
                                    {formData.gender === 'male'?'Male':formData.gender === 'female' ? 'Female':'Other'}
                                </p>
                                {formData.birthday && (
                                    <p>
                                        <i className="bi bi-calender3 me-2"></i>
                                        {new Date(formData.birthday).toLocaleDateString()}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* right column edit form*/}
                <div className="col-lg-8">
                    <div className="card">
                        <div className="card-header bg-primary text-white">
                            <h4 className="mb-0">Edit Profile</h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={submitHandler}>
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label className="form-label">Full Name</label>
                                        <input type="text" className="form-control" value={formData.name} onChange={(e)=>setFormData({...formData,name:e.target.value})}/>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="fomr-label">Birthday</label>
                                        <input type="date" className="form-control" value={formData.birthday} onChange={(e)=>setFormData({...formData, birthday:e.target.value})}/>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Gender</label>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
