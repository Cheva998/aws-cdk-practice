import { SyntheticEvent, useState } from 'react';
import { DataService } from '../../services/DataService';
import { NavLink } from 'react-router-dom';

type CreatespaceProps = {
    dataService: DataService;
}
type CustomEvent = {
    target: HTMLInputElement
}

export default function CreateSpace({ dataService }: CreatespaceProps) {
    const [name, setName] = useState<string>("");
    const [location, setLocation] = useState<string>("");
    const [photo, setPhoto] = useState<File | undefined>();
    const [actionResult, setActionResult] = useState<string>("");

    const handleSubmit = async (event: SyntheticEvent) => {
        event.preventDefault();
        if (name && location) {
            const id = "123";
            setActionResult(`Created space with id ${id}`);
            setName('');
            setLocation('');
        } else {
            setActionResult('Please provide a name and location')
        }
    };

    function setPhotoUrl(event: CustomEvent){
        console.log(event);
        if (event.target.files && event.target.files[0]) {
            setPhoto(event.target.files[0]);
        }
    }

    function renderPhoto() {
        if (photo) {
            const localPhotoUrl = URL.createObjectURL(photo)
            return <img alt='' src={localPhotoUrl} style={{ maxWidth: "200px"}}/>
        }
    }

    function renderForm() {
        if (!dataService.isAuthorized()) {
            return <NavLink to={"/login"}>Please login</NavLink>
        }
        return (
            <form onSubmit={(e) => handleSubmit(e)}>
                <br/><br/>
                <label>Name:</label><br/>
                <input value={name} onChange={(e) => setName(e.target.value)} /><br/>
                <label>Location:</label><br/>
                <input value={location} onChange={(e) => setLocation(e.target.value)} /><br/>
                <label>Photo:</label><br/>
                <input type='file' onChange={(e) => setPhotoUrl(e)} /><br/>
                {renderPhoto()}<br/>
                <input type="submit" value="Create space"/>
            </form>
        )
    };

    return <div>
        {renderForm()}
        {actionResult? <h3>{actionResult}</h3>: undefined}
    </div>

}