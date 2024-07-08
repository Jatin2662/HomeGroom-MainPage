import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import './CustomerProfile.css';
import { EmailContext } from './contexts/EmailContext';

function CustomerProfile() {
    const { email } = useContext(EmailContext);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [selectedAddress, setSelectedAddress] = useState('');
  const [allAddresses, setAllAddresses] = useState([]);
  const [editStates, setEditStates] = useState({});
  const [message, setMessage] = useState('');

  console.log("Customer profile at ", email)

  useEffect(() => {
    // Fetch user details if they exist
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/CustomerProfile/${email}`);
        const profile = response.data;
        // console.log(profile);
        setFirstName(profile.firstname);
        setLastName(profile.lastname);
        setSelectedAddress(profile.selectedAddress);
        setAllAddresses(profile.allAddresses);
        
      } catch (error) {
        console.error("Error fetching profile", error);
      }
    };

    fetchProfile();
  }, [email]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const profileData = {
      firstName,
      lastName,
      selectedAddress,
      allAddresses
    };

    try {
      const response = await axios.put(`http://localhost:3001/CustomerProfile/${email}`, profileData);
      console.log(response.data.message);
      setMessage(response.data.message);
    } catch (error) {
      console.error("Error saving details", error);
    }
  };

  const handleAddNewAddress = () => {
    setAllAddresses([...allAddresses, { id: allAddresses.length + 1, address: "" }]);
  };

  const handleEditAddress = (id) => {
    setEditStates({ ...editStates, [id]: true });
  };

  const handleSaveAddress = (id) => {
    setEditStates({ ...editStates, [id]: false });
  };

  const handleSelectAddress = (address) => {
    setSelectedAddress(address);
  };

  return (
    <section className="customerProfile">
      {!email ? (
                <h1>LogIn first</h1>
            ) : (
                <>
      <main>
        <aside>
          <h1>My Profile</h1>
          {/* {message && <p>{message}</p>} */}
          <div className="message-space">{message}</div>

          <div className="aside-logo">
            <span>HG</span>
          </div>
        </aside>
        <form onSubmit={handleSubmit}>
          <div className="cp-name">
            <label>First Name: </label>
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
          </div>

          <div className="cp-name">
            <label>Last Name: </label>
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
          </div>

          <div className="cp-name">
            <label>Selected Address: </label>
            <textarea id="address" rows="4" cols="50" value={selectedAddress} disabled />
          </div>

          <div className="cp-addresses">
            <div className="hj7">
              <div>All Addresses</div>
              <button type="button" onClick={handleAddNewAddress}>Add new address</button>
            </div>

            {allAddresses.length === 0 ? (
              <h1>Add addresses</h1>
            ) : (
              allAddresses.map((i) => {
                const { id, address } = i;
                const isEditing = editStates[id] || false;

                return (
                  <div className="cp-new-address" key={id}>
                    <div className="cp-address">
                      <label>
                        <input
                          type="radio"
                          name="selectedAddress"
                          value={address}
                          onChange={() => handleSelectAddress(address)}
                          checked={selectedAddress === address}
                        />
                        Address {id}
                      </label>
                      <textarea
                        id="address"
                        rows="4"
                        cols="50"
                        value={address}
                        onChange={(e) => {
                          const newAddresses = allAddresses.map(addr =>
                            addr.id === id ? { ...addr, address: e.target.value } : addr
                          );
                          setAllAddresses(newAddresses);
                        }}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="cp-address-btns">
                      <button type="button" onClick={() => handleEditAddress(id)}>Edit</button>
                      <button type="button" onClick={() => handleSaveAddress(id)}>Save</button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <div className="cp-btn">
            <button type="submit">Save All Changes</button>
          </div>
        </form>
      </main>
      </>
            )}
    </section>
  );
}

export default CustomerProfile;






// import React, { useState } from "react";
// import './CustomerProfile.css';

// function CustomerProfile() {
//     const [firstName, setFirstName] = useState('');
//     const [lastName, setLastName] = useState('');
//     const [selectedAddress, setSelectedAddress] = useState('');
//     const [allAddresses, setAllAddresses] = useState([]);
//     const [editStates, setEditStates] = useState({});

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         // Handle form submission logic
//     }

//     const handleAddNewAddress = () => {
//         setAllAddresses([...allAddresses, { id: allAddresses.length + 1, address: "" }]);
//     }

//     const handleEditAddress = (id) => {
//         setEditStates({ ...editStates, [id]: true });
//     }

//     const handleSaveAddress = (id) => {
//         setEditStates({ ...editStates, [id]: false });
//     }

//     const handleSelectAddress = (address) => {
//         setSelectedAddress(address);
//     }

//     return (
//         <section className="customerProfile">
//             <main>
//                 <aside>
//                     <h1>My Profile</h1>
//                     <div className="aside-logo">
//                         <span>HG</span>
//                     </div>
//                 </aside>
//                 <form onSubmit={handleSubmit}>
//                     <div className="cp-name">
//                         <label>First Name: </label>
//                         <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
//                     </div>

//                     <div className="cp-name">
//                         <label>Last Name: </label>
//                         <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
//                     </div>

//                     <div className="cp-name">
//                         <label>Selected Address: </label>
//                         <textarea id="address" rows="4" cols="50" value={selectedAddress} disabled />
//                     </div>

//                     <div className="cp-addresses">
//                         <div className="hj7">
//                             <div>All Addresses</div>
//                             <button type="button" onClick={handleAddNewAddress}>Add new address</button>
//                         </div>

//                         {allAddresses.length === 0 ? (
//                             <h1>Add addresses</h1>
//                         ) : (
//                             allAddresses.map((i) => {
//                                 const { id, address } = i;
//                                 const isEditing = editStates[id] || false;

//                                 return (
//                                     <div className="cp-new-address" key={id}>
//                                         <div className="cp-address">
//                                             <label>
//                                                 <input
//                                                     type="radio"
//                                                     name="selectedAddress"
//                                                     value={address}
//                                                     onChange={() => handleSelectAddress(address)}
//                                                     checked={selectedAddress === address}
//                                                 />
//                                                 Address {id}
//                                             </label>
//                                             <textarea
//                                                 id="address"
//                                                 rows="4"
//                                                 cols="50"
//                                                 value={address}
//                                                 onChange={(e) => {
//                                                     const newAddresses = allAddresses.map(addr =>
//                                                         addr.id === id ? { ...addr, address: e.target.value } : addr
//                                                     );
//                                                     setAllAddresses(newAddresses);
//                                                 }}
//                                                 disabled={!isEditing}
//                                             />
//                                         </div>
//                                         <div className="cp-address-btns">
//                                             <button type="button" onClick={() => handleEditAddress(id)}>Edit</button>
//                                             <button type="button" onClick={() => handleSaveAddress(id)}>Save</button>
//                                         </div>
//                                     </div>
//                                 );
//                             })
//                         )}
//                     </div>

//                     <div className="cp-btn">
//                         <button type="submit">Save All Changes</button>
//                     </div>
//                 </form>
//             </main>
//         </section>
//     );
// }

// export default CustomerProfile;





// import React, { useState } from "react";
// import './CustomerProfile.css';

// function CustomerProfile() {

//     const [firstName, setFirstName] = useState('');
//     const [lastName, setLastName] = useState('');
//     const [selectedAddress, setSelectedAddress] = useState('');
//     const [allAddresses, setAllAddresses] = useState([
//         { id: 1 },
//         { id: 2 },
//         { id: 3 }
//     ]);
//     const [disabled, setDisabled] = useState(true);

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//     }

//     const EditAddress = (id)=>{
//         setDisabled(false);
//     }

//     const SaveAddress = (id)=>{
//         setDisabled(true);
//     }


//     return (
//         <section className="customerProfile">
//             <main>
//                 <aside>
//                     <h1>My Profile</h1>
//                     <div className="aside-logo">
//                         <span>HG</span>
//                     </div>
//                 </aside>
//                 <form onSubmit={handleSubmit}>

//                     <div className="cp-name">
//                         <label>First Name: </label>
//                         <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required></input>
//                     </div>

//                     <div className="cp-name">
//                         <label>Last Name: </label>
//                         <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required></input>
//                     </div>

//                     <div className="cp-name">
//                         <label>Selected Address: </label>
//                         <textarea id="address" rows="4" cols="50" value={selectedAddress} disabled></textarea>
//                     </div>

//                     <div className="cp-addresses">
//                         <div className="hj7">
//                             <div>All Addresses</div>
//                             <button>Add new address</button>
//                         </div>


//                         {allAddresses.length === 0 ? <h1>Add addresses</h1> :
//                             allAddresses.map((i) => {

//                                 const {id} = i;

//                                 return (
//                                     <div className="cp-new-address" key={id}>
//                                         <div className="cp-address">
//                                             <label>Address 1 </label>
//                                             <textarea id="address" rows="4" cols="50" disabled={!disabled}></textarea>
//                                         </div>
//                                         <div className="cp-address-btns">
//                                             <button onClick={EditAddress(id)}>Edit</button>
//                                             <button onClick={SaveAddress(id)}>Save</button>
//                                         </div>
//                                     </div>
//                                 );
//                             })
//                         }
//                     </div>







//                     <div className="cp-btn">
//                         <button type="submit">Save Changes</button>
//                     </div>

//                 </form>
//             </main>

//         </section>
//     );
// }

// export default CustomerProfile;