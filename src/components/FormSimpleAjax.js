import React from 'react'
import { stringify } from 'qs'
import { serialize } from 'dom-form-serializer'

import './Form.css'

class Form extends React.Component {
  static defaultProps = {
    name: 'The Golden Healing — Bookings',
    subject: 'New message via site', // optional subject of the notification email
    action: '',
    honeypot: 'confirm',
    successMessage: 'Thanks for your booking, we will get back to you soon',
    errorMessage:
      'There is a problem, your message has not been sent, please try contacting us via email'
  }

  state = {
    alert: '',
    disabled: false
  }

  handleSubmit = e => {
    e.preventDefault()
    if (this.state.disabled) return

    const form = e.target
    const data = serialize(form)
    this.setState({ disabled: true })
    fetch(form.action + '?' + stringify(data), {
      method: 'POST'
    })
      .then(res => {
        if (res.ok) {
          return res
        } else {
          throw new Error('Network error')
        }
      })
      .then(() => {
        form.reset()
        this.setState({
          alert: this.props.successMessage,
          disabled: false
        })
      })
      .catch(err => {
        console.error(err)
        this.setState({
          disabled: false,
          alert: this.props.errorMessage
        })
      })
  }

  render() {
    const { name, subject, action, honeypot } = this.props

    return (
      <form
        className="Form"
        name={name}
        action={action}
        onSubmit={this.handleSubmit}
        data-netlify=""
        data-netlify-honeypot={honeypot}
      >
        <label className="Form--Label">
          <input
            className="Form--Input"
            type="text"
            placeholder="Name and Surname"
            name="name"
            required
          />
        </label>
        <label className="Form--Label">
          <input
            className="Form--Input"
            type="email"
            placeholder="Email"
            name="emailAddress"
            required
          />
        </label>
        <label className="Form--Label has-arrow">
          <select
            className="Form--Input Form--Select"
            name="type"
            defaultValue="Issue to be heal"
            required
          >
            <option disabled hidden>
              Issue to be heal
            </option>
            <option>Physical issue</option>
            <option>Mental issue</option>
            <option>Emotional issue</option>
            <option>Spiritual issue</option>
            <option disabled>--</option>
            <option>General Healing</option>
          </select>
        </label>
        <label className="Form--Label">
          <textarea
            className="Form--Input Form--Textarea"
            placeholder="Message"
            name="message"
            rows="10"
            required
          />
        </label>
        <label className="Form--Label">
          <p>Date and time (to be confirmed)</p>
          <input
            className="Form--Input"
            type="datetime-local"
            placeholder="Date and time (to be confirmed)"
            name="data-time"
            required
          />
        </label>
        <label className="Form--Label">
          <input
            className="Form--Input"
            type="text"
            placeholder="Location (timezone)"
            name="location"
            required
          />
        </label>
        <label className="Form--Label">
          <input
            className="Form--File"
            type="file"
            placeholder="Photo (optional)"
            name="photo"
            id="photo"
          />
          <label for="photo">
            Photo (optional)
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="17"
              viewBox="0 0 20 17"
            >
              <path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z" />
            </svg>
          </label>
        </label>
        <input
          type="text"
          name={honeypot}
          className="Form--Input-honey"
          placeholder="Leave blank if you are a human"
        />
        {!!subject && <input type="hidden" name="subject" value={subject} />}
        <input type="hidden" name="form-name" value={name} />
        <input
          className="Button Form--SubmitButton"
          type="submit"
          value="Book Now"
          disabled={this.state.disabled}
        />
        {this.state.alert && (
          <div className="Form--Alert">{this.state.alert}</div>
        )}
      </form>
    )
  }
}

export default Form
