import React, { useEffect, useState } from "react";
import { Input, Select, Button, Table, message } from "antd";
import { getclients } from "../../APIs/client";
import { set } from "lodash";
import { getProjects } from "../../APIs/project";
import { getComponents } from "../../APIs/component";
import { addOffers, getOffers } from "../../APIs/offer";
import { getRevision, updateRevision } from "../../APIs/revision";

export const Revision = () => {
  const [clientOptions, setClientOptions] = useState([]);
  const [projectOptions, setProjectOptions] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [clientName, setClientName] = useState("");
  const [componentName, setComponentName] = useState("");
  const [componentOptions, setComponentOptions] = useState([]);
  const [DescriptionOfPanel, setDescriptionOfPanel] = useState("");
  const [Name, setName] = useState("");
  const [QtyOfPanel, setQtyOfPanel] = useState("");
  const [PartName, setPartName] = useState("");
  const [Price, setPrice] = useState("");
  const [data, setData] = useState([]);
  const [offerData, setOfferData] = useState([]);
  const [OfferId, setOfferId] = useState("");
  const [revisionData, setRevisionData] = useState([]);
  const [addRevision, setAddRevision] = useState("");

  const Handle$OnClick$Submit = () => {
    const newData = {
      key: data.length + 1,
      name: Name,
      components: componentName,
      part_name: PartName,
      price: Price,
    };

    setData([...data, newData]);
  };

  const RevisionHandler = () => {
    setAddRevision(OfferId);
  };

  const Handle$OnClick$Proceed = async () => {
    const SendData = {
      project_id: projectName,
      description_of_panel: DescriptionOfPanel,
      client_id: clientName,
      qty_of_panel: Number(QtyOfPanel),
      panels_to_be_created: [],
    };

    data.map((e) => {
      if (SendData.panels_to_be_created.length !== 0) {
        const index = SendData.panels_to_be_created.findIndex(
          (e1) => e1.name === e.name
        );
        if (index === -1) {
          SendData.panels_to_be_created.push({
            name: e.name,
            price: Number(e.price),
            parts: [
              {
                part_name: e.part_name,
                components: e.components,
              },
            ],
          });
        } else {
          SendData.panels_to_be_created[index].parts.push({
            part_name: e.part_name,
            components: e.components,
          });
        }
      } else {
        SendData.panels_to_be_created.push({
          name: e.name,
          price: Number(e.price),
          parts: [
            {
              part_name: e.part_name,
              components: e.components,
            },
          ],
        });
      }
    });

    const response = await updateRevision(SendData, addRevision);

    if (response.type === "success") {
      message.success(response.data.message);
    } else if (response.type === "error") {
      message.error(response.message);
    }
  };

  const OfferColumns = [
    {
      title: "Project Name",
      dataIndex: "project_name",
      key: "name",
    },
    {
      title: "Client Name",
      dataIndex: "client_name",
      key: "client_name",
    },
    {
      title: "Quantity Of Panel",
      dataIndex: "Qty_of_panel",
      key: "Qty_of_panel",
    },
    {
      title: "Description Of Panel",
      dataIndex: "description_of_panel",
      key: "description_of_panel",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <Button
          onClick={() => {
            console.log({
              offer_id: record.key,
            });
            setOfferId(record.key);
          }}
        >
          Revise
        </Button>
      ),
    },
  ];

  const revisionColumns = [
    {
      title: "Date Of Revision",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Project Name",
      dataIndex: "project_name",
      key: "name",
    },
    {
      title: "Quantity Of Panel",
      dataIndex: "Qty_of_panel",
      key: "Qty_of_panel",
    },
    {
      title: "Description Of Panel",
      dataIndex: "description_of_panel",
      key: "description_of_panel",
    },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Components",
      render: (text, record) => (
        <div>
          {componentOptions.map((e) => {
            if (e.value === record.components) {
              return <div>{e.label}</div>;
            }
          })}
        </div>
      ),
    },
    {
      title: "Part Name",
      dataIndex: "part_name",
      key: "part_name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <Button
          onClick={() => {
            setData(data.filter((e) => e.name !== record.name));
          }}
        >
          Delete
        </Button>
      ),
    },
  ];

  const getAllClients = async () => {
    const response = await getclients();
    if (response.type === "success") {
      setClientOptions(
        response.data.data.map((e) => ({ label: e.name, value: e._id }))
      );
    } else if (response.type === "error") {
      console.log(response.message);
    }
  };

  const getAllComponents = async () => {
    const response = await getComponents();
    if (response.type === "success") {
      setComponentOptions(
        response.data.data.map((e) => ({ label: e.name, value: e._id }))
      );
    } else if (response.type === "error") {
      console.log(response.message);
    }
  };

  const getAllOffers = async () => {
    const response = await getOffers();
    if (response.type === "success") {
      console.log(response.data.data);
      const newData = response.data.data.map((e) => ({
        key: e._id,
        project_name: e.project_id.project_name,
        client_name: e.client_id.name,
        Qty_of_panel: e.Qty_of_panel,
        description_of_panel: e.description_of_panel,
      }));
      setOfferData(newData);
    } else if (response.type === "error") {
      console.log(response.message);
    }
  };

  useEffect(() => {
    getAllOffers();
    getAllClients();
    getAllComponents();
  }, []);

  useEffect(() => {
    if (OfferId === "") return;
    getRevision({ offer_id: OfferId }).then((response) => {
      if (response.type === "success") {
        console.log(response.data.data);
        const projectName = response.data.data.project_id.project_name;
        const newData = response.data.data.revisions.map((e) => {
          return {
            key: e._id,
            date: e.Date.toString(),
            project_name: projectName,
            Qty_of_panel: e.data_before_revision.Qty_of_panel,
            description_of_panel: e.data_before_revision.description_of_panel,
          };
        });
        setRevisionData(newData);
      } else if (response.type === "error") {
        console.log(response.message);
      }
    });
  }, [OfferId]);

  useEffect(() => {
    if (clientName === "") return;
    getProjects({ client_id: clientName }).then((response) => {
      if (response.type === "success") {
        setProjectOptions(
          response.data.data.map((e) => ({
            label: e.project_name,
            value: e._id,
          }))
        );
      } else if (response.type === "error") {
        console.log(response.message);
      }
    });
  }, [clientName]);

  const resetValue = () => {
    setClientName("");
    setProjectName("");
    setComponentName("");
    setDescriptionOfPanel("");
    setName("");
    setQtyOfPanel("");
    setPartName("");
    setPrice("");
    setData([]);
  };

  return (
    <div className="w-full min-h-screen bg-[#f3f7ff]">
      <p className="text-3xl text-blue-800 font-semibold p-4">Revision</p>
      <div className="rounded-md bg-white flex flex-col m-4">
        {OfferId === "" && (
          <Table columns={OfferColumns} dataSource={offerData} />
        )}
        {OfferId !== "" && (
          <div className="flex flex-col items-center justify-center p-6">
            <Table columns={revisionColumns} dataSource={revisionData} />
            <Button
              className="bg-blue-700 text-white"
              onClick={RevisionHandler}
            >
              Add Revision
            </Button>
          </div>
        )}
        {addRevision !== "" && (
          <div className="w-full flex justify-evenly">
            <div className="w-3/4 p-4">
              <section>
                <div className="font-semibold p-2">Client Name</div>
                <Select
                  className="w-full"
                  placeholder="Tags Mode"
                  onChange={(value) => {
                    setClientName(value);
                    setProjectName("");
                  }}
                  value={clientName}
                  options={clientOptions}
                />
              </section>
              <section>
                <div className="font-semibold p-2">Description Of Panel</div>
                <Input
                  onChange={(e) => setDescriptionOfPanel(e.target.value)}
                  value={DescriptionOfPanel}
                  className=""
                  placeholder="Enter Quantity"
                />
              </section>
              <section>
                <div className="font-semibold p-2">Name</div>
                <Input
                  onChange={(e) => setName(e.target.value)}
                  value={Name}
                  className=""
                  placeholder="Enter Name"
                />
              </section>
              <section>
                <div className="font-semibold p-2">Components</div>
                <Select
                  className="w-full"
                  placeholder="Tags Mode"
                  name="company"
                  onChange={(value) => setComponentName(value)}
                  value={componentName}
                  options={componentOptions}
                />
              </section>
            </div>
            <div className="bg-white w-3/4 p-4">
              <section>
                <div className="font-semibold p-2">Select Project</div>
                <Select
                  className="w-full"
                  placeholder="Tags Mode"
                  name="company"
                  onChange={(value) => setProjectName(value)}
                  value={projectName}
                  options={projectOptions}
                />
              </section>
              <section>
                <div className="font-semibold p-2">Qty. Of Panel</div>
                <Input
                  onChange={(e) => setQtyOfPanel(e.target.value)}
                  value={QtyOfPanel}
                  className=""
                  placeholder="Enter Value"
                  name="rating_value"
                />
              </section>
              <section>
                <div className="font-semibold p-2">Part Name</div>
                <Input
                  onChange={(e) => setPartName(e.target.value)}
                  value={PartName}
                  name="price"
                  className=""
                  placeholder="Enter Part Name"
                />
              </section>
              <section>
                <div className="font-semibold p-2">Price</div>
                <Input
                  onChange={(e) => setPrice(e.target.value)}
                  value={Price}
                  type="number"
                  name="price"
                  className=""
                  placeholder="Enter Price"
                />
              </section>
            </div>
          </div>
        )}
        {addRevision !== "" && (
          <section className="flex items-center justify-center gap-5 p-4">
            <Button
              onClick={Handle$OnClick$Submit}
              className="bg-blue-700 text-white"
            >
              Add
            </Button>
            <Button onClick={resetValue} className="bg-gray-500 text-white">
              Reset
            </Button>
          </section>
        )}
      </div>
      {data.length > 0 && (
        <div className="w-full">
          <p className="text-3xl text-blue-800 font-semibold p-4">
            Offer Details
          </p>
          <div className="p-4">
            <Table dataSource={data} columns={columns} />
            <div className="flex flex-col items-center justify-center">
              <Button
                onClick={() => Handle$OnClick$Proceed()}
                className="bg-blue-700 text-white"
              >
                Process
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
