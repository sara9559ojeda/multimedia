import { Outlet, useLocation } from "react-router-dom";
import { Container, Navbar, Nav, Dropdown } from "react-bootstrap";
import { AnimatePresence, motion } from "framer-motion";

function Layout() {
  const location = useLocation();

  return (
    <div className="d-flex flex-column vh-100">
      {/* Cabecera fija */}
      <Navbar expand="lg" bg="dark" variant="dark"> 
        <Container fluid>
          <Navbar.Brand href="#">Portafolio</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarSupportedContent" />
          <Navbar.Collapse id="navbarSupportedContent">
            <Nav className="me-auto">
              <Nav.Link href="/">Inicio</Nav.Link>
              {/* Menú desplegable con React-Bootstrap */}
              <Dropdown>
                <Dropdown.Toggle as={Nav.Link} id="dropdown-custom">
                  Prácticas 1
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="/ejercicio2">Texturas</Dropdown.Item>
                  <Dropdown.Item href="/ejercicio3">Plano y Figuras</Dropdown.Item>
                  <Dropdown.Item href="/ejercicio4">Agrupacion de Objetos - React</Dropdown.Item>
                  <Dropdown.Item href="/ejercicio5">Agrupacion de Objetos - Three.js</Dropdown.Item>
                  <Dropdown.Item href="/luces">Luces</Dropdown.Item>
                  <Dropdown.Item href="/three-sin-luces">Three.js Sin Luces</Dropdown.Item>

               </Dropdown.Menu>
              </Dropdown>
            
              <Dropdown>
                <Dropdown.Toggle as={Nav.Link} id="dropdown-custom">
                  Laboratorio
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="/ejercicio1lab1">Ejercicio 1</Dropdown.Item>
                  <Dropdown.Item href="/ejercicio2lab1">Ejercicio 2 - Living Room</Dropdown.Item>
                  <Dropdown.Item href="/ejercicio3lab1">Ejercicio 3</Dropdown.Item>
                  <Dropdown.Item href="/ejercicio4lab1">Ejercicio 4</Dropdown.Item>
                  <Dropdown.Item href="/ejercicio5lab1">Ejercicio 5 - HDRI</Dropdown.Item>
                  <Dropdown.Item href="/laboratorio">Laboratorio</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Contenedor de las páginas con transiciones suaves */}
      <Container
        fluid
        className="flex-grow-1 p-4"
        style={{
          backgroundColor: "black",
          color: "white",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </Container>
    </div>
  );
}

export default Layout;
