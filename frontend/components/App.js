// ❗ IMPORTANT
// The ✨ tasks found inside this component are not in order.
// Check the README for the appropriate sequence to follow.
import React, { useState, useEffect } from 'react'

let id = 0
const getId = () => ++id

let teamMembers = [
  {
    id: getId(), fname: "Alice", lname: "Smith",
    bio: "Passionate about front-end development and user experience. \
I love creating intuitive and visually appealing web interfaces."
  },
  {
    id: getId(), fname: "Bob", lname: "Johnson",
    bio: "Aspiring web developer with a background in graphic design. \
I enjoy bringing creativity and aesthetics to the digital world."
  },
]

export default function App() {
  const [members, setMembers] = useState(teamMembers)
  const [editing, setEditing] = useState(null)
  // ✨ Create a third state to track the values of the inputs
  const [formValues, setFormValues] = useState({
    fname: '',
    lname: '',
    bio: ''
  });

  useEffect(() => {
    if (editing !== null) {
      // Populate form with another member's data
      const member = members.find(m => m.id === editing);
      setFormValues({
        fname: member.fname,
        lname: member.lname,
        bio: member.bio
      });
    } else {
      // Reset form if not editing
      setFormValues({ fname: '', lname: '', bio: '' });
    }
  }, [editing])

  const onChange = evt => {
    // ✨ This is the change handler for your text inputs and your textarea.
    // You can check `evt.target.id` to know which input changed
    // and then you can use `evt.target.value` to update the state of the form
    const { id, value } = evt.target;
    setFormValues({
      ...formValues,
      [id]: value
    });
  };
  const edit = id => {
    // Set the editing state to the id of th member being edited
    setEditing(id);
  };
  const submitNewMember = () => {
    // Add new member to the members state
    setMembers([...members, { ...formValues, id: getId() }]);
    setFormValues({ fname: '', lname: '', bio: '' }); // Reset the form
  };
  const editExistingMember = () => {
    // Update the member in the members state
    setMembers(members.map(member =>
      member.id === editing ? { ...formValues, id: editing } : member
    ));
    setFormValues({ fname: '', lname: '', bio: '' }); // Reset form
    setEditing(null); // Exit edit mode
  };
  const onSubmit = evt => {
    evt.preventDefault(); // Prevent page reload
    if (editing === null) {
      submitNewMember();
    } else {
      editExistingMember();
    }
  };
  return (
    <div>{/* ✨ Fix the JSX by wiring the necessary values and event handlers */}
      <div id="membersList">
        <h2>Team Members</h2>
        <div>
          {
            members.map(mem => (
              <div key={mem.id} className="member">
                <div>
                  <h4>{mem.fname} {mem.lname}</h4>
                  <p>{mem.bio}</p>
                </div>
                <button onClick={() => edit(mem.id)}>Edit</button>
              </div>
            ))
          }
        </div>
      </div>
      <div id="membersForm">
        <h2>{editing ? 'Edit' : 'Add'} a Team Member</h2>
        <form onSubmit={onSubmit}>
          <div>
            <label htmlFor="fname">First Name </label>
            <input id="fname" type="text" placeholder="Type First Name" value={formValues.fname} onChange={onChange} />
          </div>

          <div>
            <label htmlFor="lname">Last Name </label>
            <input id="lname" type="text" placeholder="Type Last Name" value={formValues.lname} onChange={onChange} />
          </div>

          <div>
            <label htmlFor="bio">Bio </label>
            <textarea id="bio" placeholder="Type Bio" value={formValues.bio} onChange={onChange} />
          </div>

          <div>
            <input type="submit" value={editing ? 'Update Member' : 'Add Member'} />
          </div>
        </form>
      </div>
    </div>
  )
}
