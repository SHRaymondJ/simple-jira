import React, { useEffect, useState } from 'react';
import { cleanObject, useDebounce, useMount } from '../../utils';
import List from './list';
import SearchPanel from './search-panel';
import qs from 'qs'

const apiUrl = process.env.REACT_APP_API_URL
const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: '',
    personId: ''
  })
  const [users, setUsers] = useState([])
  const [list, setList] = useState([])
  const debouncedParam = useDebounce(param, 200)
  useMount(() => {
    fetch(`${apiUrl}/users`).then(async res => {
      if (res.ok) {
        setUsers(await res.json())
      }
    })
  }, [])

  useEffect(() => {
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`).then(async res => {
      if (res.ok) {
        setList(await res.json())
      }
    })
  }, [debouncedParam])

  return <div>
    <SearchPanel users={users} param={param} setParam={setParam} />
    <List users={users} list={list} />
  </div>;
};

export default ProjectListScreen;
