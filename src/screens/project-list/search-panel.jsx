import React from 'react';

const SearchPanel = ({ users, param, setParam }) => {

  return <div>
    <input type="text" value={param.name} onChange={evt => setParam({
      ...param,
      name: evt.target.value
    })} />
    <select onChange={evt => setParam({
      ...param,
      personId: evt.target.value
    })}>
      <option value="" key="1">负责人</option>
      {
        users.map(user => <option value={user.id} key={user.id}>{user.name}</option>)
      }
    </select>
  </div>;
};

export default SearchPanel;
