

import './seatPicker.css'
import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import authService from '../../services/auth.service';
import userService from '../../services/user.service';
import img from './down2.jpg';



const Busz = [
    {
        name: 'Zemen',
        price: 10,
        occupied: [],
    },
    {
        name: 'odda',
        price: 12,
        occupied: [],
    },
    {
        name: 'Abay',
        price: 8,
        occupied:[],
    },
    {
        name: 'Selam',
        price: 9,
        occupied: [],
    },
]
export function Parrent() {
    const [busData, setBusesdata] = useState(Busz)
    return (
        <SeatPicker buses={busData} />
    )
}
const seats = Array.from({ length: 5*11}, (_, i) => i)

export default function SeatPicker({ buses }) {

    const [selectedBus, setSelectedBuses] = useState(buses[0])
    const [selectedSeats, setSelectedSeats] = useState([])
    useEffect(() => {

        userService.getReservedSit().then(
            response => {
                
                console.log(response.data.occupiedSitNo)
                setSelectedBuses({ ...selectedBus, occupied: response.data.occupiedSitNo })
            },

        );

    }, [])

    return (
        <div className="App">
            <Buses
                movie={selectedBus}
                buses={buses}
                onChange={movie => {
                    setSelectedSeats([])
                    setSelectedBuses(movie)
                }}
            />
            <ShowCase />
            <Cinema
                movie={selectedBus}
                selectedSeats={selectedSeats}
                onSelectedSeatsChange={selectedSeats => setSelectedSeats(selectedSeats)}
            />

            <p className="info">
                You have selected <span className="count">{selectedSeats.length}</span>{' '}
                seats for the price of{' '}
                <span className="total">
                    {selectedSeats.length * selectedBus.price}$
                </span>
            </p>
        </div>
    )
}

function Buses({ buses, movie, onChange }) {
    return (
        <div className="buses">
            <label htmlFor="movie">Pick a bus</label>
            <select
                id="movie"
                value={movie.name}
                onChange={e => {
                    onChange(buses.find(movie => movie.name === e.target.value))
                }}
            >
                {buses.map(movie => (
                    <option key={movie.name} value={movie.name}>
                        {movie.name} (${movie.price})
                    </option>
                ))}
            </select>
        </div>
    )
}

function ShowCase() {
    return (
        <ul className="ShowCase">
            <li>
                <span className="seat" /> <small>N/A</small>
            </li>
            <li>
                <span className="seat selected" /> <small>Selected</small>
            </li>
            <li>
                <span className="seat occupied" /> <small>Occupied</small>
            </li>
        </ul>
    )
}

function Cinema({ movie, selectedSeats, onSelectedSeatsChange }) {
  
    function handleSelectedState(seat) {
        const isSelected = selectedSeats.includes(seat)
        if (isSelected) {
            onSelectedSeatsChange(
                selectedSeats.filter(selectedSeat => selectedSeat !== seat),
            )
        } else {
            onSelectedSeatsChange([...selectedSeats, seat])
        }
    }

    return (
        <div className="Cinema">
            <div className="image" ><img className='image' src={img} alt="image" /></div>

            <div className="seats">
                {seats.map(seat => {
                    const isSelected = selectedSeats.includes(seat)
                    const isOccupied = movie.occupied.includes(seat)
                    return (
                        <span
                            tabIndex="0"
                            key={seat}
                            className={clsx(
                                'seat',
                                isSelected && 'selected',
                                isOccupied && 'occupied',
                            )}
                            onClick={isOccupied ? null : () => handleSelectedState(seat)}
                            onKeyPress={
                                isOccupied
                                    ? null
                                    : e => {
                                        if (e.key === 'Enter') {
                                            handleSelectedState(seat)
                                        }
                                    }
                            }
                        >
                            {seat+1}
                            </span>
                    )
                })}
            </div>
            <button onClick={Reserved}>Reserve</button>
        </div>
    )
    function Reserved() {
        console.log(selectedSeats)
        authService.lockSit(selectedSeats);
        // history.push('/route')

    }
}


// function Reserved() {
//     console.log(selectedSeats)
//     authService.lockSit(selectedSeats);
// }
