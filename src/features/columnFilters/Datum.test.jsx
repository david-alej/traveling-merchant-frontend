import DataTable from "./DataTable"
import { renderWithProviders } from "../../util/test-utils"

import { screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import axios from "axios"

jest.mock("axios")

const dummyData = []

axios.post.mockResolvedValue()

describe("DataTable feature", function () {})
