import { Subscription,PaymentHistory,OneTimeDonation} from "../models/payment.model.js";
import Dashboard from "../models/dashboard.model.js";
import Razorpay from "razorpay";
import { emailTransporter } from "../utils/emailSender.js";
import User from "../models/user.model.js";


export const createOrder = async (req, res) => {
  const razorpay = new Razorpay({
    key_id:"rzp_test_Jpuy3kl4GTFDTy",
    key_secret:"FpvacaXTDC8WkH0UFS8LXSGu"
  });
  try {
    const {amount } = req.body;

    if (!amount) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const options = {
      amount: amount * 100, // Convert to paise (₹1 = 100 paise)
      currency: "INR",
      // receipt: `donation_rcpt_${userId}_${Date.now()}`,
      // payment_capture: 1, // Auto-capture payment
    };

    const order = await razorpay.orders.create(options);
    res.status(201).json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });

  } catch (error) {
    console.error("Error in: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createPlan = async (req, res) => {
  const razorpay = new Razorpay({
    key_id:"rzp_test_Jpuy3kl4GTFDTy",
    key_secret:"FpvacaXTDC8WkH0UFS8LXSGu"
  });
  try {
    const {name,amount,period } = req.body;
    if (!name||!amount||!period) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const plan = await razorpay.plans.create({
      period:period,// "monthly", // "weekly", "yearly", etc.
      interval: 1,
      item: {
        name:name,
        amount: amount * 100, // ₹500 in paise
        currency: "INR",
        description: name
      }
    });
    res.status(200).json({ planId: plan.id });}
    catch (error) {
    console.error("Error in: ", error);
    res.status(500).json({ error: error.error.description });
  }
};


export const createSubscriptionOrder = async (req, res) => {
  const razorpay = new Razorpay({
    key_id:"rzp_test_Jpuy3kl4GTFDTy",
    key_secret:"FpvacaXTDC8WkH0UFS8LXSGu"
  });
  try {
    const {planId } = req.body;

    if (!planId) {
      return res.status(401).json({ error: "All fields are required" });
    }
    
    const options = {
      plan_id: planId,
      total_count: 12, // total billing cycles
      customer_notify: 1,
    };

    const order = await razorpay.subscriptions.create(options);
    console.log('test',order)
    res.status(201).json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });

  } catch (error) {
    console.error("Error in: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};




export const createSubscription = async (req, res) => {
  try {
    const { name, amount, frequency, panNumber, address, userId,phoneNumber,email,razorpay_subscription_id,userName } = req.body;

    if (!name || !amount || !frequency || !panNumber || !address || !userId||!phoneNumber||!email) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newSubscription = new Subscription({
      userId,
      name,
      amount,
      frequency,
      panNumber,
      address,
      email,
      razorpay_subscription_id
    });
  
    const rspo = await newSubscription.save();
    const paymentHistory = new PaymentHistory({
      userId,
      type: 'subscription',
      details: newSubscription,
      amount,
      razorpay_subscription_id,
      isCancel:false
    });

    await paymentHistory.save();
    const dashboard = await Dashboard.findOne({ userId });
    if (!dashboard) {
        const newDashboard = new Dashboard({
          userId,
          contribution: amount,
          duration: 0,
          referrals: 0
        });
        await newDashboard.save();
      } else {
        dashboard.contribution += amount;
        await dashboard.save();
      }


      const user = await User.findById(userId).select("-password -resetPasswordToken");
      if(user.receiveUpdatesOnWhatsApp){
        const respoWati = await fetch(`https://live-mt-server.wati.io/333163/api/v1/sendTemplateMessage?whatsappNumber=${phoneNumber}`, {
          method: "POST",
          headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3ZmMwMDRkMS00ZjFhLTQyYjMtYTkyMC1mYTJiMmFkNjQ4ODMiLCJ1bmlxdWVfbmFtZSI6InN1Y2hldGFuQHNhaXByYWthc2hhbmEub3JnIiwibmFtZWlkIjoic3VjaGV0YW5Ac2FpcHJha2FzaGFuYS5vcmciLCJlbWFpbCI6InN1Y2hldGFuQHNhaXByYWthc2hhbmEub3JnIiwiYXV0aF90aW1lIjoiMDQvMTAvMjAyNSAxMDozODo1OSIsInRlbmFudF9pZCI6IjMzMzE2MyIsImRiX25hbWUiOiJtdC1wcm9kLVRlbmFudHMiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBRE1JTklTVFJBVE9SIiwiZXhwIjoyNTM0MDIzMDA4MDAsImlzcyI6IkNsYXJlX0FJIiwiYXVkIjoiQ2xhcmVfQUkifQ.JssZ_dKwOxx1wrN45pKbPis_4nocVyhb7mhu4z7fKWg`,
          "Content-Type": "application/json"
          },
          body: JSON.stringify({
          template_name: "one_time_donation_and_thank_you_message_utility",
          broadcast_name: "one_time_donation_and_thank_you_message_utility",
          parameters: [{ name: "name", value:userName}]
          })
        });
        const data = await respoWati.json();
      }

    if(user.receiveEmailNotification){
      const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Thank You for Subscribing to Onenation Foundation!",
        html: `
          <h2>Onenation Foundation!</h2>
          <p>Hi ${userName || ''},</p>
          <p>Thank you for subscribing to Onenation Foundation! We're thrilled to have you as part of our community.</p>
          <p>You'll be the first to know about our latest updates, events, and initiatives. We look forward to having you with us as we work towards making a difference.</p>
          <p>If you have any questions or need assistance, don't hesitate to reach out to us.</p>
          <p>Best regards,<br/>The Onenation Foundation Team</p>
        `,
      };
      const respoEmail = await emailTransporter.sendMail(mailOptions);
    }
    
    res.status(201).json(newSubscription);
  } catch (error) {
    console.error("Error in createSubscription: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const cancelSubscription = async (req, res) => {
  const razorpay = new Razorpay({
    key_id:"rzp_test_Jpuy3kl4GTFDTy",
    key_secret:"FpvacaXTDC8WkH0UFS8LXSGu"
  });
  const {id, subscription_id } = req.body;

  try {
    const cancellation = await razorpay.subscriptions.cancel(subscription_id, {
      cancel_at_cycle_end: 0 // set 1 to cancel at the end of current billing cycle
    });

    const updatedSubscription = await PaymentHistory.findByIdAndUpdate(
      id,
      { isCancel: true },
      { new: true } // returns the updated document
    );
    res.json({
      message: "Subscription cancelled successfully",
      data: cancellation
    });
  }catch (error) {
    console.error("Error in: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateSubscriptionName = async (req, res) => {
  try {
    const { name,subscriptionId } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    const subscription = await PaymentHistory.findById(subscriptionId);
    console.log('testuuu',subscription,subscriptionId)
    if (!subscription) {
      return res.status(404).json({ error: "Subscription not found" });
    }

    subscription.name = name;
    await subscription.save();

    res.status(200).json({ message: "Subscription name updated successfully", subscription });
  } catch (error) {
    console.error("Error in updateSubscriptionName: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};



export const createOneTimeDonation = async (req, res) => {
    try {
      const { name, amount, allocation, panNumber, address, userId,userName,phoneNumber,email } = req.body;
  
      if (!name || !amount || !allocation || !panNumber || !address || !userId||!email) {
        return res.status(400).json({ error: "All fields are required" });
      }
  
      const newDonation = new OneTimeDonation({
        userId,
        name,
        amount,
        allocation,
        panNumber,
        address
      });
  
      await newDonation.save();
  
      const paymentHistory = new PaymentHistory({
        userId,
        type: 'one-time-donation',
        details: newDonation,
        amount
      });
      await paymentHistory.save();

      const dashboard = await Dashboard.findOne({ userId });
      if (!dashboard) {
        const newDashboard = new Dashboard({
          userId,
          contribution: amount,
        });
        await newDashboard.save();
      } else {
        dashboard.contribution += amount;
        await dashboard.save();
      }
      const user = await User.findById(userId).select("-password -resetPasswordToken");
      if(user.receiveUpdatesOnWhatsApp){
        const respoWati = await fetch(`https://live-mt-server.wati.io/333163/api/v1/sendTemplateMessage?whatsappNumber=${phoneNumber}`, {
          method: "POST",
          headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3ZmMwMDRkMS00ZjFhLTQyYjMtYTkyMC1mYTJiMmFkNjQ4ODMiLCJ1bmlxdWVfbmFtZSI6InN1Y2hldGFuQHNhaXByYWthc2hhbmEub3JnIiwibmFtZWlkIjoic3VjaGV0YW5Ac2FpcHJha2FzaGFuYS5vcmciLCJlbWFpbCI6InN1Y2hldGFuQHNhaXByYWthc2hhbmEub3JnIiwiYXV0aF90aW1lIjoiMDQvMTAvMjAyNSAxMDozODo1OSIsInRlbmFudF9pZCI6IjMzMzE2MyIsImRiX25hbWUiOiJtdC1wcm9kLVRlbmFudHMiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBRE1JTklTVFJBVE9SIiwiZXhwIjoyNTM0MDIzMDA4MDAsImlzcyI6IkNsYXJlX0FJIiwiYXVkIjoiQ2xhcmVfQUkifQ.JssZ_dKwOxx1wrN45pKbPis_4nocVyhb7mhu4z7fKWg`,
          "Content-Type": "application/json"
          },
          body: JSON.stringify({
          template_name: "one_time_donation_and_thank_you_message_utility",
          broadcast_name: "one_time_donation_and_thank_you_message_utility",
          parameters: [{ name: "name", value:userName}]
          })
        });
        const data = await respoWati.json();
      }

      if(user.receiveEmailNotification){
        const mailOptions = {
          from: process.env.EMAIL,
          to: email,
          subject: "Thank You for Donation to Onenation Foundation!",
          html: `
            <h2>Onenation Foundation!</h2>
            <p>Hi ${userName || ''},</p>
            <p>Thank you for Donation to Onenation Foundation! We're thrilled to have you as part of our community.</p>
            <p>You'll be the first to know about our latest updates, events, and initiatives. We look forward to having you with us as we work towards making a difference.</p>
            <p>If you have any questions or need assistance, don't hesitate to reach out to us.</p>
            <p>Best regards,<br/>The Onenation Foundation Team</p>
          `,
        };
        const respoEmail = await emailTransporter.sendMail(mailOptions);
      }

  
      res.status(201).json(newDonation);
    } catch (error) {
      console.error("Error in createOneTimeDonation: ", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  };



export const getPaymentHistory = async (req, res) => {
  try {
    const userId = req.params.userId;
     if(!userId){
        return res.status(404).json({ error: "User not found" });
     }
    const paymentHistory = await PaymentHistory.find({ userId }).populate('userId');

    if (!paymentHistory.length) {
      return res.status(404).json({ error: "No payment history found for this user." });
    }

    res.status(200).json(paymentHistory);
  } catch (error) {
    console.error("Error in getPaymentHistory: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};



export const getPaymentsByAllocation = async (req, res) => {
    try {
        const userId = req.params.userId; 

        if (!userId) {
            return res.status(400).json({ error: "userId is required" });
        }

        const donations = await OneTimeDonation.find({ userId });

        if (!donations || donations.length === 0) {
            return res.status(404).json({ error: "No donations found for this user." });
        }

        const totalAmount = donations.reduce((acc, donation) => acc + donation.amount, 0);

        const allocationStats = donations.reduce((acc, donation) => {
            if (!acc[donation.allocation]) {
                acc[donation.allocation] = { totalAmount: 0, donations: [] };
            }
            acc[donation.allocation].totalAmount += donation.amount;
            acc[donation.allocation].donations.push(donation);
            return acc;
        }, {});

        const allocationPercentage = Object.keys(allocationStats).map(allocation => {
            const allocationData = allocationStats[allocation];
            const percentage = ((allocationData.totalAmount / totalAmount) * 100).toFixed(2);
            return {
                allocation,
                totalAmount: allocationData.totalAmount,
                percentage
            };
        });

        res.status(200).json({
            totalAmount,
            allocationPercentage,
            donations
        });
    } catch (error) {
        console.error("Error in getPaymentsByAllocationPercentage: ", error.message);
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
};