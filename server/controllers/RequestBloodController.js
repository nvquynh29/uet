import mongoose from 'mongoose'
/* eslint-disable camelcase */
import RequestBlood from '../models/RequestBlood.js'
import User from '../models/User.js'

const addRequestBlood = async (req, res) => {
  try {
    let newRequestBlood = new RequestBlood(req.body)
    newRequestBlood = await newRequestBlood.save()
    return res.status(200).json(newRequestBlood)
  } catch (error) {
    return res.status(500).json(error)
  }
}

const getRequests = async (_, res) => {
  try {
    const requests = await RequestBlood.find({ accepted: false, organization_id: null })
    return res.status(200).json(requests)
  } catch (error) {
    return res.status(500).json(error)
  }
}

const markAsAccepted = async (req, res) => {
  try {
    const { listID } = req.body
    const { _id } = req.user
    const { organization_id } = await User.findOne({ _id })
    const response = await RequestBlood.updateMany(
      {
        _id: {
          $in: listID,
        },
      },
      {
        $set: {
          accepted: true,
          organization_id: mongoose.Types.ObjectId(organization_id),
        },
      },
    )
    return res.status(200).json(response)
  } catch (error) {
    return res.status(500).json(error)
  }
}

export const RequestBloodController = {
  addRequestBlood,
  getRequests,
  markAsAccepted,
}
