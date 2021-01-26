import axios from 'axios';

import UsersService from "../users.service";
jest.mock('axios');

describe("UsersService", () => {
  it('works with async/await', async () => {
    let params = {};    
    // const response = await UsersService.findAll(axios, params, null);
    axios
    .get('https://api.coindesk.com/v1/bpi/currentprice.json')
    .then(response => (this.info = response.data.bpi))
    .catch(error => console.log(error))
  });
  /*  
  it("find all", () => {
    let params = {};
    console.log(UsersService);    
    console.log(UsersService.findAll);
    expect.assertions(1);
    // return Users.all().then(data=>expect(data).toEqual(users));
    return UsersService.findAll(axios, params, null)
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });

  });
  */
});
