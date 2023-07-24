import { AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, TableContainer, Table, Tbody, Tr, Td, Accordion, Box } from "@chakra-ui/react"
import { TodoList } from "./todo-list"
import { Section } from "./types"

export interface SectionsListPropsI {
  sections: Section[]
}
export const SectionsList = ({ sections }: SectionsListPropsI) => {
  return (
    <Accordion allowMultiple defaultIndex={[0]}>
      {
        sections.map((section) => (
          <AccordionItem key={section.id}>
            <h2>
              <AccordionButton>
                <Box as="span" flex='1' textAlign='left'>
                  {section.name}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <TodoList todos={section.todos} />
            </AccordionPanel>
          </AccordionItem>
        ))
      }
    </Accordion >
  )
}