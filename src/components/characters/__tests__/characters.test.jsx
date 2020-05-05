import React from "react";
import Characters from "../index";
import Card from "../card";
import CardDetails from "../cardDetails";
import Pagination from "../../pagination";
import { shallow } from "enzyme";

const emptyCahracter = {};
const character = {
  id: 1,
  name: "Rick Sanchez",
  status: "Alive",
  species: "Human",
  gender: "Male",
  origin: {
    name: "Earth",
    url: "https://rickandmortyapi.com/api/location/1",
  },
  location: {
    name: "Earth",
    url: "https://rickandmortyapi.com/api/location/20",
  },
  image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
  episode: [
    "https://rickandmortyapi.com/api/episode/1",
    "https://rickandmortyapi.com/api/episode/2",
  ],
  created: "2017-11-04T18:48:46.250Z",
};
describe("characters", () => {
  beforeAll(() => {
    global.fetch = jest.fn();
    global.fetch.mockImplementation(
      () =>
        new Promise((resolve) => {
          resolve({
            json: () => new Promise((resolve) => resolve([])),
          });
        })
    );
  });
  afterAll(() => {
    global.fetch.mockClear();
  });
  it("render the compopnent correctly", () => {
    const component = shallow(<Characters />);

    expect(component).toMatchSnapshot();
  });
  it("should hide and display the pagination properly", () => {
    const component = shallow(<Characters />);
    // console.log(component.debug());
    component.find("#from").simulate("change", {
      target: {
        name: "from",
        value: "10/10/2017",
      },
    });
    component.find("#to").simulate("change", {
      target: {
        name: "to",
        value: "11/10/2017",
      },
    });

    component.find("#filter").simulate("click");
    expect(component.find(Pagination).exists()).toEqual(false);
    component.find("#clearfilter").simulate("click");
    expect(component.find(Pagination).exists()).toEqual(true);
  });
});

describe("card", () => {
  it("render component correctly when character is not empty", () => {
    const component = shallow(<Card character={character} />);
    expect(component).toMatchSnapshot();
  });

  it("render component correctly when character is empty", () => {
    const component = shallow(<Card character={emptyCahracter} />);
    expect(component).toMatchSnapshot();
  });

  it("should show and hide the details properly", () => {
    let component = shallow(<Card character={character} />);
    component.simulate("click");
    expect(component.find(CardDetails).exists()).toEqual(true);
    component.simulate("click");
    expect(component.find(CardDetails).exists()).toEqual(false);
  });
});

describe("card details", () => {
  it("render component correctly when details is not empty", () => {
    const component = shallow(<CardDetails />);
    expect(component).toMatchSnapshot();
  });

  it("render component correctly when details is empty", () => {
    const component = shallow(<CardDetails details={null} />);
    expect(component).toMatchSnapshot();
  });
});
