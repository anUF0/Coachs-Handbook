import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_PLAYER } from '../../utils/mutations';

import { QUERY_PLAYERS, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

const PlayerForm = () => {
  const [positionText, setPositionText] = useState('');

  const [addPlayer, { error }] = useMutation(ADD_PLAYER, {
    refetchQueries: [QUERY_PLAYERS, 'getPlayers', QUERY_ME, 'me'],
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addPlayer({
        variables: {
          positionText,
          thoughtAuthor: Auth.getProfile().data.username,
        },
      });

      setPositionText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'positionText') {
      setPositionText(value);
    }
  };

  return (
    <div>
      <h3>Add New Players Below</h3>

      {Auth.loggedIn() ? (
        <>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="positionText"
                placeholder="Player Position goes here..."
                value={positionText}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Add Player
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
          You need to be logged in to add new players. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default PlayerForm;
