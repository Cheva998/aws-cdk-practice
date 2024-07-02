import { useEffect, useState } from "react";
import { DataService } from "../../services/DataService";
import { SpaceEntry } from "../model/Model";
import { NavLink } from "react-router-dom";
import SpaceComponent from "./SpaceComponents";


interface SpaceProps {
    dataService: DataService
}

export default function Spaces(props: SpaceProps) {
    const [spaces, setSpaces] = useState<SpaceEntry[]>();
    const [reservationText, setReservationText] = useState<string>();


    useEffect(() => {
        const getSpaces = async () => {
            console.log('getting spaces ...')
            const spaces = await props.dataService.getSpaces();
            setSpaces(spaces);
        }
        getSpaces();
    }, [])

    async function reserveSpace(spaceId: string, spaceName: string) {
        const reservationResult = await props.dataService.reserveSpace(spaceId);
        setReservationText(`you reserved ${spaceName}, reservation id: ${reservationResult}`)
    }

    function renderSpaces() {
        if(!props.dataService.isAuthorized()) {
            return <NavLink to={'/login'}>Please login</NavLink>
        }
        const rows: any[] = [];
        if (spaces) {
            for(const spaceEntry of spaces) {
                rows.push(
                    <SpaceComponent
                        key={spaceEntry.id}
                        id={spaceEntry.id}
                        location={spaceEntry.location}
                        name={spaceEntry.name}
                        photoUrl={spaceEntry.photoUrl}
                        reserveSpace={reserveSpace}
                    />
                )
            }
        }
        return rows;
    }

    return (
        <div>
            <h2>Welcome to Spaces page</h2>
            {reservationText? <h2>{reservationText}</h2>: undefined}
            {renderSpaces()}
        </div>
    )
}