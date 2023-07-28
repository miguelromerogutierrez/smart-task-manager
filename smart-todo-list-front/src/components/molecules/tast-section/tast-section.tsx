import { Box, Heading, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"

interface TaskSectionProps {
  title : string 
  tasks : Task[]
}

interface Task {
  title : string
  responsible : string
  deadline : string
}

export const TaskSection = ( { title, tasks } : TaskSectionProps)=>{
  return (<Box>
    <Heading as="h4" textAlign="start" fontSize="large">{title}</Heading>

    <TableContainer>
      <Table>
        <Thead>
          <Tr>
            <Th pl="0px">
              Task name
            </Th>
            <Th width="200px" pl="0px">
              Responsible
            </Th>
            <Th width="200px" pl="0px">
              Deadline
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {tasks.map((task) => {
            return (<Tr>
              <Td>
                {task.title}
              </Td>
              <Td width="200px" pl="0px">
                {task.responsible}
              </Td>
              <Td width="200px" pl="0px">
                {task.deadline}
              </Td>
            </Tr>)
          })}
          
        </Tbody>
      </Table>
    </TableContainer>
  </Box>)
}