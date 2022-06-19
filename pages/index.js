import { motion } from "framer-motion";
import useSWR from "swr";
import styled from "styled-components";
import { useEffect, useState } from "react";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const itemVariants = {
  init: (i) => ({
    x: -20,
    opacity: 0,
    transition: {
      duration: 0.3,
      type: "tween",
      ease: "easeIn",
    },
  }),
  showInit: (i) => ({
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      delay: i * 0.05,
      type: "tween",
      ease: "easeIn",
    },
  }),
  show: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      type: "tween",
      ease: "easeIn",
    },
  },
  hover: {
    x: 20,
    transition: {
      duration: 0.1,
      type: "tween",
      ease: "easeIn",
    },
  },
};

const cl2 =
  "linear-gradient(90deg, rgba(53,255,198,1) 0%, rgba(0,212,255,1) 100%)";

const ItemContainer = styled(motion.li)`
  padding: 18px 16px;
  list-style: none;
  background: rgba(180, 248, 222, 1);
  transition: all 0.3s;
  font-family: Didot;

  &:hover {
    background: ${cl2};
    border-radius: 1.25rem;
    font-weight: bold;
  }
`;

const Item = ({ text, i }) => {
  const [s, setS] = useState(false);

  useEffect(() => {
    if (!s) {
      setS(true);
    }
  }, []);

  return (
    <motion.div
      variants={{
        init: { opacity: 1 },
        showInit: { opacity: 1 },
        show: { opacity: 1 },
        hover: { opacity: 1 },
      }}
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
      }}
      initial="init"
      animate={s ? "show" : "showInit"}
      whileHover="hover"
    >
      <motion.div
        variants={{
          init: { height: 0 },
          showInit: { height: 0 },
          show: {
            height: 0,
            transition: {
              duration: 0.2,
              type: "tween",
              ease: "easeIn",
            },
          },
          hover: {
            height: "auto",
            transition: {
              duration: 0.1,
              type: "tween",
              ease: "easeIn",
            },
          },
        }}
        style={{
          width: "6px",
          position: "absolute",
          top: "0",
          bottom: "0",
          left: "0",
          background: cl2
        }}
      ></motion.div>
      <ItemContainer
        custom={i}
        variants={itemVariants}
        style={{
          flex: 1,
          textAlign: "left",
          display: "flex",
          alignItems: "center",
        }}
      >
        <motion.span>{text}</motion.span>
      </ItemContainer>
    </motion.div>
  );
};

const ListContaienr = styled.ul`
  margin: 0;
  padding: 0;
  text-indent: 0;
  list-style-type: none;
`;

const AList = () => {
  const { data, error } = useSWR(
    "https://jsonplaceholder.typicode.com/todos",
    fetcher
  );

  if (error) return <div>error</div>;
  if (!data) return <div>Loading...</div>;
  return (
    <div>
      <ListContaienr>
        {data.slice(0, 50).map((item, i) => (
          <Item key={i} text={item.title} i={i} />
        ))}
      </ListContaienr>
    </div>
  );
};

export default function App() {
  return (
    <div className="App" style={{ margin: '12px' }}>
      <h2>Framer Motion List Examples</h2>
      <AList />
    </div>
  );
}
