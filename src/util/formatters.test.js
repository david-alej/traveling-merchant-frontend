import {
  formatPhoneNumber,
  formatDate,
  formatFullDate,
  formatSimpleDate,
  formatTagsColumn,
} from "./formatters"

import "@testing-library/jest-dom"

describe("Util formatters", function () {
  const randomDate = () => {
    const start = new Date(2000)
    const end = new Date()

    const date = new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    )

    const formatter = new Intl.DateTimeFormat("en-US", {
      minute: "numeric",
      hour: "numeric",
      hour12: true,
      day: "numeric",
      month: "short",
      year: "numeric",
      timeZone: "US/Central",
      formatMatcher: "basic",
    })

    let [monthAndDay, year, time] = formatter.format(date).split(",")

    year = year.slice(1)
    time = time.slice(1)
    const month = monthAndDay.slice(0, 3)
    const day = monthAndDay.slice(4)

    return {
      dateString: date.toISOString(),
      day,
      month,
      year,
      time,
    }
  }

  describe("formatPhoneNumber", function () {
    it("When input is not just a string of ten digits, Then an error is thrown", function () {
      const notAString = 1234567890
      const lessThan10digits = "12345678"
      const hasALetter = "123456789L"

      const tryFormatPhoneNumber = (input) => {
        try {
          formatPhoneNumber(input)
        } catch (err) {
          expect(err.message).toBe("Input is not a string that has 10 digits.")
        }
      }

      tryFormatPhoneNumber(notAString)
      tryFormatPhoneNumber(lessThan10digits)
      tryFormatPhoneNumber(hasALetter)
    })

    it("When input is a string made up of 10 digits, Then phone number is formatted with parenthesis and a hyphen", function () {
      const input = "1234567890"

      const result = formatPhoneNumber(input)

      expect(result).toBe("(123)456-7890")
    })
  })

  describe("Helper formatDate", function () {
    it("When input is falsy, Then an empty string is returned", function () {
      const input = undefined

      const response = formatDate(input)

      expect(response).toBe("")
    })

    it("When input is not a date in ISO string, Then error is thrown", function () {
      const isNotAString = 23421
      const utcString = "Wed, 14 Jun 2017 07:00:00 GMT"

      const tryToLocalDate = (input) => {
        try {
          formatDate(input)
        } catch (err) {
          expect(err.message)
        }
      }

      tryToLocalDate(isNotAString)
      tryToLocalDate(utcString)
    })

    it("When input is a date in ISO string, Then formatted date is returned", function () {
      const { day, month, year, time, dateString } = randomDate()

      const result = formatDate(dateString)

      expect(result).toBe(`${month} ${day}, ${year}, ${time}`)
    })
  })

  describe("formatFullDate", function () {
    it("When input is a date in ISO string, Then date is returned in a formatted version with Month, day, year, and US time", function () {
      const { day, month, year, time, dateString } = randomDate()

      const result = formatFullDate(dateString)

      expect(result).toBe(`${month} ${day}, ${year}, ${time}`)
    })
  })

  describe("formatSimpleDate", function () {
    it("When input is a date in ISO string, Then date is returned in a formatted version with Month, day, and year", function () {
      const { day, month, year, dateString } = randomDate()

      const result = formatSimpleDate(dateString)

      expect(result).toBe(`${month} ${day}, ${year}`)
    })
  })

  describe("formatTagsColumn", function () {
    const tags = ["one", "two", "three", "four"]

    it("When tags is an array of strings and shallow equals false, Then tags array is returned with all the elements in string form seperated by commas", function () {
      const shallow = false

      const result = formatTagsColumn(tags, shallow)

      expect(result).toBe("one, two, three, four")
    })

    it("When tags is an array of strings and shallow equals true, Then tags array is returned with the first three elements in string form seperated by commas", function () {
      const shallow = true

      const result = formatTagsColumn(tags, shallow)

      expect(result).toBe("one, two, three, ...")
    })
  })
})
