import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

const TeamForm = () => {
  const [teamText, setTeamText] = useState('');

  const [characterCount, setCharacterCount] = useState(0);

  const [addTeam, { error }] = useMutation(ADD_TEAM, {
    refetchQueries: [QUERY_SINGLE_TEAM, 'getTeam', QUERY_ME, 'me'],
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await addTeam({
        variables: {
          teamText,
          coachName: Auth.getProfile().data.username,
        },
      });

      setTeamText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'teamText' && value.length <= 50) {
      setTeamText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div>
      <h3>All Good Teams Need a Good Name, but no more than 50 Characters</h3>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${
              characterCount === 50 || error ? 'text-danger' : ''
            }`}
          >
            Character Count: {characterCount}/50
          </p>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="teamText"
                placeholder="Give You team a name..."
                value={teamText}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Create New Team!
              </button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form>
        </>
      ) : (
        <p>
          You need to be logged in create a team. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default TeamForm;
