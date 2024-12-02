import React, { useState } from "react";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Header from "@/components/Header";
import CircularImageUpload from "@/components/ImageInput";
import Input from "@/components/Input";
import MultiSelectDropdown from "@/components/MultiselectorDropdown";
import { useParams } from "@tanstack/react-router";
import { Edit } from "lucide-react";
import imstack from "../images/authpageimage.png";
import { Toggle } from "@/components/ui/toggle";
import Switch from "@/components/Switch";
import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@/enum";
import { getProjectTags, getTechnologies } from "@/utilts";

const UserDetails = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [projects, setProjects] = useState<{ id: string; value: string }[]>([]);
  const [tech, setTech] = useState<{ id: string; value: string }[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const { userId } = useParams({ strict: false });

  const { data: technologies, isFetching: isTechnologiesLoading } = useQuery({
    queryKey: [QueryKeys.GET_TECHNOLOGIES],
    queryFn: getTechnologies,
    staleTime: 1000 * 5 * 60,
  });

  const { data: projectTags, isFetching: isLoadingProjectTags } = useQuery({
    queryKey: [QueryKeys.GET_PROJECT_TAGS],
    queryFn: getProjectTags,
    staleTime: 1000 * 5 * 60,
  });

  const handleIsAdminToggleButton = () => {
    setIsAdmin((ps) => !ps);
  };

  return (
    <Header isLoading={false}>
      <Card
        title="User Details"
        content={
          <div className="flex flex-col gap-8">
            <div className="grid items-center gap-4 md:grid-cols-2 ">
              <div className="flex items-center justify-start gap-4">
                {/* <CircularImageUpload
                  lable="Profile pic"
                  setImage={() => {}}
                  value={imstack}
                /> */}
                <img
                  src={imstack}
                  alt="Uploaded"
                  className="w-20 h-20 rounded-full"
                />
                <Input
                  className="grow"
                  lable="First Name"
                  type="text"
                  placeholder="First Name..."
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <Input
                lable="Last Name"
                placeholder="Last Name..."
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <Input
                disabled
                lable="email"
                placeholder="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {/* <MultiSelectDropdown
                label="Projects Write Access"
                options={
                  projectTags
                    ? projectTags.data.map(({ projectId, projectName }) => ({
                        id: projectId,
                        value: projectName,
                      }))
                    : []
                }
                placeholder="Projects..."
                values={projects}
                onSelect={setProjects}
              /> */}
              <MultiSelectDropdown
                label="Technologies"
                options={
                  technologies
                    ? technologies?.data.map(
                        ({ technologyId, technology }) => ({
                          id: technologyId,
                          value: technology,
                        })
                      )
                    : []
                }
                placeholder="Technologis..."
                values={tech}
                onSelect={setTech}
              />
              {/* <Switch
                lable="Is Admin"
                value={isAdmin}
                onChange={handleIsAdminToggleButton}
              /> */}
            </div>
            <Button className="max-w-24" content="Update" onClick={() => {}}>
              <Edit className="w-4 h-4" />
            </Button>
          </div>
        }
      />
    </Header>
  );
};

export default UserDetails;
