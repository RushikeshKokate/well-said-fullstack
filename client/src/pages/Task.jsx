import { useState, React } from "react";
import { MdGridView } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { MdList } from "react-icons/md";
import { useParams } from "react-router-dom";
import Loader from "../component/Loader";
import Title from "../component/Title";
import Button from "../component/Button";
import clsx from "clsx";
import Tabs from "../component/Tabs";
import TaskTitle from "../component/TaskTitle";
import TaskCard from "../component/TaskCard";
import { tasks } from "../assets/data";
import Table from "../component/Task/Table";
const TABS = [
  { title: "Board View", icon: <MdGridView /> },
  { title: "List View", icon: <MdList /> },
];



const Task = () => {
  const params = useParams();
  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const status = params?.status || "";
  return loading ? (
    <div className="py-10">
      <Loader />
    </div>
  ) : (
    <div className="w-full ">
      <div className="flex items-center justify-between mb-4">
        <Title title={status ? `${status} Tasks` : "Tasks"} />

        {!status && (
          <Button
            label="Create Task"
            icon={<IoMdAdd className="text-lg" />}
            className="flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md py-2 2xl:py-2.5"
          />
        )}
      </div>

      <div className="">
      <Tabs tabs={TABS} setSelected={setSelected} selected={selected}>
       
         
          <TaskCard  tasks={tasks} />
          <Table tasks={tasks}/>
         
     
    </Tabs>
      </div>
    </div>
  );
};

export default Task;
