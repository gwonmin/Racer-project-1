import { Schema, model } from "mongoose";

const ProjectSchema = new Schema(
    {
        id:{
            type: String,
            required: true,
        },
        title:{
            type: String,
            required: true,
        },
        description:{
            type: String,
            required: false,
            default: "설명이 아직 없습니다. 추가해 주세요.",
        },
        from_date:{
            type: Date,
            required: true,
        },
        to_date:{
            type: Date,
            require:true,
            
        },
        git:{
            type: String,
        }
    },
    {
        timestamps: true,
    }
);

const ProjectModel = model("Project", ProjectSchema);

export default {ProjectModel};