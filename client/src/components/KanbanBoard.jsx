import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { SimpleGrid, Stack, Title } from '@mantine/core';
import JobCard from './JobCard';

const jobStatus = ["Interviewing", "Applied", "Offer", "Rejected"]

function KanbanBoard({deleteJob, updateJob, filteredJobs} ) {

    const onDragEnd = (result) => {
        if (!result.destination) return;

        updateJob(result.draggableId, result.destination.droppableId)
  
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
        
        <div style={{ 
            display: 'flex', 
            gap: '24px', 
            overflowX: 'auto', 
            paddingBottom: '20px',
            
            width: 'fit-content',  
            maxWidth: '100%',      
            margin: '0 auto'       
        }}>

            {jobStatus.map((status) => (
            
            <Stack 
                key={status} 
                gap="md" 
                style={{ 
                    minWidth: '320px', 
                    flexShrink: 0      
                }}
            >
                <Title order={3} ta="center" mb="sm">{status}</Title>

                <Droppable droppableId={status}>
                {(provided, snapshot) => (
                    <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={{ 
                        minHeight: '200px',
                        background: snapshot.isDraggingOver ? '#f1f3f5' : 'transparent',
                        padding: '4px',
                        borderRadius: '8px',
                    }}
                    >
                    
                    {filteredJobs
                        .filter((job) => job.status?.toLowerCase() === status.toLowerCase())
                        .map((job, index) => (
                        
                        <Draggable 
                            key={job.id} 
                            draggableId={job.id.toString()}
                            index={index}
                        >
                            {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={{ 
                                ...provided.draggableProps.style,
                                marginBottom: '10px'
                                }}
                            >
                                <JobCard 
                                jobData={job} 
                                onDelete={deleteJob} 
                                onUpdate={updateJob}
                                />
                            </div>
                            )}
                        </Draggable>

                        ))}
                    {provided.placeholder}
                    </div>
                )}
                </Droppable>

            </Stack>
            ))}
        </div>      
        </DragDropContext>
    )
}


export default KanbanBoard