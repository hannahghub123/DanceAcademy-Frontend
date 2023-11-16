import React, { useEffect } from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Typography from '@mui/joy/Typography';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Avatar from '@mui/joy/Avatar';
import axiosInstance from '../../axios/tutoraxios';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const CourseModal = (props) => {
    const [open, setOpen] = React.useState(false);
    const [tdata,setTdata] = React.useState([])
    const [structdata,setStructdata] = React.useState([])
    const [selectedTutor,setSelectedTutor] = React.useState("")
    const [showChooseTutor,setShowChooseTutor] = React.useState(true)
    const {id} = useParams()
    const navigate = useNavigate()

    console.log("idddddd ahneeee",props.id);

    useEffect(()=>{
        axiosInstance.get(`tdetails/${id}`)
        .then((res)=>{
            console.log(res.data,"tutor modalll");
            setTdata(res.data)
        }).catch(()=>{
            alert("error")
        })

        const datas={
            id:props.id,
        }

        axiosInstance.post("course-struct/",datas)
        .then((res)=>{
            console.log(res.data,"struct");
            setStructdata(res.data)
        })
    },[])

    const loadScript = (src) => {
        return new Promise((resolve) => {
          const script = document.createElement("script");
          script.src = src;
          script.onload = () => {
            resolve(true);
          };
          script.onerror = () => {
            resolve(false);
          };
          document.body.appendChild(script);
        });
      };


    const dispalyRazorpay = async () => {
        setOpen(!open)
        const amount = structdata.price
       
        const det = localStorage.getItem("stdDetails");
        if (det) {
          const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
          );
          if (!res) {
            alert("You are offline.. failed to laod razorpay");
            return;
          }
          const options = {
            key: "rzp_test_AkR7SqZ2txt5YW",
            currency: "INR",
            amount: amount * 100,
            name: "User",
            description: "Thanks for purchasing",
    
            // after payment this function works 
            handler: function (response) {
              // alert(response.razorpay_payment_id);
              const paymentData = {
                paymentId: response.razorpay_payment_id,
              };

              const stdData = localStorage.getItem("stdDetails");
              console.log("haiis", stdData,paymentData,"??????///////");
              const parsedData = JSON.parse(stdData);
              console.log("haiim", parsedData.id);

              const datas = {
                studentId : parsedData.id,
                structId: props.id,
                tutorName: selectedTutor,
                razorpayId: response.razorpay_payment_id,
              };

              console.log(datas,"lllllll");
    
              axios
                .post("http://localhost:8000/std/course-payment/", datas)
                .then((res) => {
                //   if (res.data.message === "already subscribed") {
                //     alert("Already subscribed");
                //     console.log("already");
                //   } else {
                //     alert("successfully subscribed");
                //   }
                console.log(res.data);
                alert("Payment Successful")
                navigate(`../std-profile/${parsedData.id}`);

                })
                .catch((error) => {
                  console.error("Error sending payment data to backend:", error);
                });
            //   alert("payment errr");
            },
            prefill: {
              name: "DanceAcademy",
            },
          };
          const paymentObj = new window.Razorpay(options);
          paymentObj.open();
        } else {
          navigate(`../opt-login`);
        console.log("errrr");
        }
      };

    

  return (
    <>
        <button className='outline-btn' onClick={() => setOpen(true)}>
        ENROLL NOW 
      </button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog
          aria-labelledby="nested-modal-title"
          aria-describedby="nested-modal-description"
          sx={(theme) => ({
            [theme.breakpoints.only('xs')]: {
              top: 'unset',
              bottom: 0,
              left: 0,
              right: 0,
              borderRadius: 0,
              transform: 'none',
              maxWidth: 'unset',
            },
          })}
        >
         
      
            <p className="text">{structdata.title} PLAN</p>
            <h6><i class='fas fa-hand-point-right icon'></i> {structdata.levels} </h6>
            <h6><i class='fas fa-hand-point-right icon'></i> {structdata.duration} min/Class </h6>
            <h6><i class='fas fa-hand-point-right icon'></i> {structdata.num_of_classes} Online Classes</h6>
        
          
          <h3>{structdata.price} / {structdata.price_per} </h3>
       
          <Typography id="nested-modal-title" level="h2">
            Please Select your Interested tutor !
          </Typography>
          <select
          
          value={selectedTutor}
          onChange={(e)=>{
            setShowChooseTutor(false)
            setSelectedTutor(e.target.value)
          }
          }
            >
                {showChooseTutor && <option>choose</option> }
                
                 {tdata.map((data) => (
        <option
          key={data.id}
          value={data.name}
        //   label={data.name}
        >
        
          {/* <ListItemDecorator>
            <Avatar src={data.image} />
          </ListItemDecorator>
          <Box component="span" sx={{ display: 'block' }}> */}
            <Typography component="span" level="title-sm">
              {data.name}
            </Typography>
            {/* <Typography level="body-xs">{data.status}</Typography> */}
          {/* </Box> */}
    
        </option>
      ))}
    </select>

    {  console.log(selectedTutor,"hey tutor selected")}
          <Box
            sx={{
              mt: 1,
              display: 'flex',
              gap: 1,
              flexDirection: { xs: 'column', sm: 'row-reverse' },
            }}
            >
            
            <button className='outline-btn' onClick={ ()=>dispalyRazorpay()}>
              Continue Payment with RazorPay
            </button>
            <Button
              variant="outlined"
              color="neutral"
              onClick={() => setOpen(!open)}
            >
              Cancel
            </Button>
          </Box>
        </ModalDialog>
      </Modal>
    </>
  )
}

export default CourseModal