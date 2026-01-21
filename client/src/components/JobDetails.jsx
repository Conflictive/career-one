import { useParams } from 'react-router-dom'

function JobDetails () {

    const { id } = useParams();

    return (
        <div>
            Job ID: {id}
        </div>
    )
}

export default JobDetails