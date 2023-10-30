import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_PLAYER } from '../../utils/mutations';

import { QUERY_PLAYERS, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

const PlayerForm = () => {
  const [formState, setFormState] = useState({
    position: '',
    MA: '',
    ST: '',
    AG: '',
    PA: '',
    AV: '',
    skillsAndTraits: '',
  });
  const [addPlayer, { error }] = useMutation(ADD_PLAYER, {
    refetchQueries: [QUERY_PLAYERS, 'getPlayers', QUERY_ME, 'me'],
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(event.target);
    setFormState({
      ...formState,
      [name]: event.target.type === 'number' ? parseInt(value) : value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    const { data } = await addPlayer({
      variables: { ...formState },
    });
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
                name="position"
                placeholder="Position"
                value={formState.position}
                className="form-input col-2"
                style={{ lineHeight: '0.5', resize: 'horizontal' }}
                onChange={handleChange}
              ></textarea>
              <input
                name="MA"
                type="number"
                placeholder="MA"
                value={formState.MA}
                className="form-input col-2"
                style={{ lineHeight: '1', resize: 'horizontal' }}
                onChange={handleChange}
              ></input>
              <input
                name="ST"
                type="number"
                placeholder="ST"
                value={formState.ST}
                className="form-input col-2"
                style={{ lineHeight: '1', resize: 'horizontal' }}
                onChange={handleChange}
              ></input>
              <input
                name="AG"
                type="number"
                placeholder="AG"
                value={formState.AG}
                className="form-input col-2"
                style={{ lineHeight: '1', resize: 'horizontal' }}
                onChange={handleChange}
              ></input>
              <input
                name="PA"
                type="number"
                placeholder="PA"
                value={formState.PA}
                className="form-input col-2"
                style={{ lineHeight: '1', resize: 'horizontal' }}
                onChange={handleChange}
              ></input>
              <input
                name="AV"
                type="number"
                placeholder="AV"
                value={formState.AV}
                className="form-input col-2 p-2"
                style={{ lineHeight: '1', resize: 'horizontal' }}
                onChange={handleChange}
              ></input>
              <textarea
                name="skillsAndTraits"
                placeholder="Skills/Traits"
                value={formState.skillsAndTraits}
                className="form-input col-11"
                style={{ lineHeight: '1', resize: 'horizontal' }}
                onChange={handleChange}
              ></textarea>
              <button
                className="p-1 btn btn-primary btn-lg"
                style={{ cursor: 'pointer', lineHeight: '1' }}
                type="submit"
              >
                +
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
