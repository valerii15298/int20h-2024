// @ts-nocheck
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./components/ui/form";
import {
  Carousel,
  CarouselItem,
  CarouselContent,
  CarouselPrevious,
  CarouselNext
} from "./components/ui/carousel";
import { Input } from "./components/ui/input";
import { trpc } from "./trpc";
import { LotInput, lotInputSchema } from "./zodTypes";

import { useAuth } from "@clerk/clerk-react";
import Dropzone from "react-dropzone";

const UploadFiles = () => {
  const [files, setFiles] = useState([]);

  const handleUpload = (acceptedFiles) => {
    console.log("logging drop/selected files", acceptedFiles);

    // Handle multiple files
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);

    // Perform actual uploads here (ideally in a loop)
  };

  const handleDelete = (file) => {
    setFiles((prevFiles) => prevFiles.filter((f) => f !== file));
  };

  return (
    <div className="main-container">
      <Dropzone onDrop={handleUpload} accept="image/*" multiple minSize={1024} maxSize={3072000}>
        {({ getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject }) => {
          const additionalClass = isDragAccept ? "accept" : isDragReject ? "reject" : "";

          return (
            <div
              {...getRootProps({
                className: `dropzone ${additionalClass}`,
              })}
            >
              <input {...getInputProps()} />
              <p>Drag'n'drop or click to upload multiple images</p>
            </div>
          );
        }}
      </Dropzone>
      {files.length > 0 && (
        <div className="uploaded-images">
          {files.map((file, index) => (
            <div key={index} className="image-container">
              <img src={URL.createObjectURL(file)} alt={`Uploaded image ${index + 1}`} />
              <button className="mainbutton" onClick={() => handleDelete(file)}>Delete</button>
            </div>
          ))}
        </div>
      )}
      {/* {files.length > 0 && (
        <h4>All images uploaded successfully!</h4>
      )} */}
    </div>
  );
};
function getDefaultLot(): LotInput {
  return {
    name: "",
    description: "",
    images: [],
    startPrice: 0,
    ownerId: "",
  };
}
const AddLotForm = () => {

  const utils = trpc.useUtils();
  const { userId } = useAuth();
  const form = useForm<LotInput>({
    defaultValues: getDefaultLot(),
    values: {
      ...getDefaultLot(),
      ownerId: userId!,
    },
    resolver: zodResolver(lotInputSchema),
  });
  const createLot = trpc.lot.create.useMutation({
    onSuccess() {
      utils.lot.list.invalidate();
    },
  });

  return (
    <Form  {...form}>

      <form
        onSubmit={form.handleSubmit((newLot) => {
          console.log(newLot);
          createLot.mutateAsync(newLot);
        })}
      >
      <UploadFiles />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                                <FormLabel>Lot name</FormLabel>
                <FormControl>
                  
                  <Input  {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
<FormLabel>Lot description</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="startPrice"
            render={({ field }) => (
              <FormItem>

<FormLabel>Lot cost</FormLabel>

                <FormControl>
                  <Input

                    onWheel={(e) => (e.target as HTMLInputElement).blur()}
                    type="number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        <div className="flex gap-2 my-2">
          <Button disabled={!userId} type="submit">
            Save
          </Button>
        </div>
      </form>
    </Form>
  )
}


const Lot = ({ lot, setImage }) => {

  return (<div className="item-lot">
    <div className="item-lot-main-data">
      <a href={`item/${lot.id}`} className="item-lot-main-data-title">
        {lot.name}
      </a>
      <div className="item-lot-carusel-controller">
        <Carousel>
          <CarouselContent>
            <CarouselItem className="md:basis-1/2 lg:basis-1/3"> <div onClick={() => setImage("https://cdn.freecodecamp.org/curriculum/cat-photo-app/relaxing-cat.jpg")} className="item-lot-carusel-controller-image"><img src="https://cdn.freecodecamp.org/curriculum/cat-photo-app/relaxing-cat.jpg" /></div></CarouselItem>
            <CarouselItem className="md:basis-1/2 lg:basis-1/3"> <div className="item-lot-carusel-controller-image"><img src="https://global.discourse-cdn.com/freecodecamp/original/4X/0/e/3/0e39630fa2958305da65bb144c6a1133caf84346.jpeg" /></div></CarouselItem>
            <CarouselItem className="md:basis-1/2 lg:basis-1/3"> <div className="item-lot-carusel-controller-image"><img src="https://cdn.freecodecamp.org/curriculum/cat-photo-app/relaxing-cat.jpg" /></div></CarouselItem>
            <CarouselItem className="md:basis-1/2 lg:basis-1/3"> <div className="item-lot-carusel-controller-image"><img src="https://cdn.freecodecamp.org/curriculum/cat-photo-app/relaxing-cat.jpg" /></div></CarouselItem>
            <CarouselItem className="md:basis-1/2 lg:basis-1/3"> <div className="item-lot-carusel-controller-image"><img src="https://cdn.freecodecamp.org/curriculum/cat-photo-app/relaxing-cat.jpg" /></div></CarouselItem>
            <CarouselItem className="md:basis-1/2 lg:basis-1/3"> <div className="item-lot-carusel-controller-image"><img src="https://cdn.freecodecamp.org/curriculum/cat-photo-app/relaxing-cat.jpg" /></div></CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <div className="item-lot-description">{JSON.stringify(lot)}
      {lot.description}
      </div>
    </div>
    <div className="item-lot-secondary-data">
      <div className="item-lot-secondary-data-cost">
        $123      
      </div>  
      <div className="item-lot-secondary-data-users">
        users 123      
      </div>  
      <div className="item-lot-secondary-data-actions">
        actions 123      
      </div>
      <div className="item-lot-secondary-data-types">
        Help for whom?
          <div className="item-lot-secondary-data-types-items">
            {[1,2,3].map(i => <div className="item-lot-secondary-data-types-item">help{i}</div>)}
          </div>
      </div>
      <div className="item-lot-secondary-data-creator">
        creator 123      
      </div>  
    </div>

    </div>)

}

const Filter = ({lotName, setLotName, lotCreator, setLotCreator, lotMinCost, setLotMinCost, lotMaxCost, setLotMaxCost, lotType, setLotType} ) => {

  return(<div className="lots-container-filter">
    <div className="lots-container-filter-activity">
      <Button className={"mainbutton " + (lotType === true ? "active" : "" ) } onClick={() => setLotType(true)}>Active</Button>
      <Button className={"mainbutton " + (lotType === false ? "active" : "")} onClick={() => setLotType(false)}>Closed</Button>

        
    </div>
    <div className="lot-name filter-input">

<label>Lot name</label>
                  <input
               value={lotName}
               type="text"
  onChange={(event) => setLotName(event.target.value)}></input>
  </div>

  
  <div className="lot-name filter-input">

<label>Lot creator</label>
                  <input
               value={lotCreator}
               type="text"
  onChange={(event) => setLotCreator(event.target.value)}></input>
  </div>
  <div className="lot-cost ">
<div className="filter-input">
<label>Min cost</label>
                  <input
               value={lotMinCost}
               type="number"
  onChange={(event) => setLotMinCost(event.target.value)}></input>
  </div>

  <div className="filter-input">
<label>Max cost</label>
                  <input
               value={lotMaxCost}
               type="number"
  onChange={(event) => setLotMaxCost(event.target.value)}></input>
  </div>
  </div>
  </div>)
}


export function Lots() {
  const lotsQuery = trpc.lot.list.useQuery();

  const [adding, setAdding] = useState(false);
  const [lotType, setLotType] = useState(false);
  const [lotName, setLotName] = useState("");
  const [lotCreator, setLotCreator] = useState("");
  const [lotMinCost, setLotMinCost] = useState(0);
  const [lotMaxCost, setLotMaxCost] = useState(0);


  const [image, setImage] = useState(false);


  if (lotsQuery.isPending) return <>Pending </>;
  if (lotsQuery.isError) return <>{lotsQuery.error.message}</>;
  return (
    <>
    {image && <div  onClick={() => {setImage(false)}} className="image-absolute-show">
      <img src={image}/>
    </div>}
    <div className="lots-container">
      <div className="lots-container-list">
        <Button onClick={() => setAdding(!adding)}>{!adding ? "Create Lot" : "Cancel Lot creation"}</Button>
        {adding &&
          <AddLotForm />
        }
        <div className="lots-container-list-items">
          {lotsQuery.data.map(lot => <Lot key={"key" + Math.random()} setImage={setImage} lot={lot} />)}
        </div>

      </div>
        <Filter lotName={lotName} setLotName={setLotName} lotCreator={lotCreator} setLotCreator={setLotCreator} lotMinCost={lotMinCost} setLotMinCost={setLotMinCost} lotMaxCost={lotMaxCost} setLotMaxCost={setLotMaxCost} lotType={lotType} setLotType={ setLotType} ></Filter>

    </div>
    </>
  );
}


export function AddLot() {

}
