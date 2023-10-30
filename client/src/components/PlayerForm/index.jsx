import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_PLAYER } from '../../utils/mutations';

import { QUERY_PLAYERS, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

const PlayerForm = () => {
  const [positionText, setPositionText] = useState('');
  const [MAValue, setMAValue] = useState('');
  const [STValue, setSTValue] = useState('');
  const [AGValue, setAGValue] = useState('');
  const [PAValue, setPAValue] = useState('');
  const [AVValue, setAVValue] = useState('');
  const [skillsAndTraitsText, setSNTText] = useState('');

  const [addPlayer, { error }] = useMutation(ADD_PLAYER, {
    refetchQueries: [QUERY_PLAYERS, 'getPlayers', QUERY_ME, 'me'],
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addPlayer({
        variables: {
          positionText,
          MAValue,
          STValue,
          AGValue,
          PAValue,
          AVValue,
          skillsAndTraitsText,
          coachName: Auth.getProfile().data.username,
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
    if (name === 'MAValue') {
      setMAValue(value);
    }
    if (name === 'STValue') {
      setSTValue(value);
    }
    if (name === 'AGValue') {
      setAGValue(value);
    }
    if (name === 'PAValue') {
      setPAValue(value);
    }
    if (name === 'AVValue') {
      setAVValue(value);
    }
    if (name === 'skillsAndTraitsText') {
      setSNTText(value);
    }
  };

  return (
    <div>
      <h3>Add A New Player Below</h3>

      {Auth.loggedIn() ? (
        <>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 flex-row">
              <textarea
                name="positionText"
                placeholder="Position"
                value={positionText}
                className="form-input col-2"
                style={{ lineHeight: '1', resize: 'horizontal' }}
                onChange={handleChange}
              ></textarea>
              <textarea
                name="MAValue"
                placeholder="MA"
                value={MAValue}
                className="form-input col-2"
                style={{ lineHeight: '1', resize: 'horizontal' }}
                onChange={handleChange}
              ></textarea>
              <textarea
                name="STValue"
                placeholder="ST"
                value={STValue}
                className="form-input col-2"
                style={{ lineHeight: '1', resize: 'horizontal' }}
                onChange={handleChange}
              ></textarea>
              <textarea
                name="AGValue"
                placeholder="AG"
                value={AGValue}
                className="form-input col-2"
                style={{ lineHeight: '1', resize: 'horizontal' }}
                onChange={handleChange}
              ></textarea>
              <textarea
                name="PAValue"
                placeholder="PA"
                value={PAValue}
                className="form-input col-2"
                style={{ lineHeight: '1', resize: 'horizontal' }}
                onChange={handleChange}
              ></textarea>
              <textarea
                name="AVValue"
                placeholder="AV"
                value={AVValue}
                className="form-input col-2 p-2"
                style={{ lineHeight: '1', resize: 'horizontal' }}
                onChange={handleChange}
              ></textarea>
              <textarea
                name="skillsAndTraitsText"
                placeholder="Skills/Traits"
                value={skillsAndTraitsText}
                className="form-input col-12"
                style={{ lineHeight: '1', resize: 'horizontal' }}
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
