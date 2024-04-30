import SettingLayout from "../../../layouts/settings";
import Clipboard from "react-clipboard.js"

import { FaRegCircleXmark, FaRegCircleCheck } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { info } from "../../../utils/toastify";

export default function Settings() {
    const router = useRouter()

    return (
        <SettingLayout title="Manage plan">
            <div className="title">
                <h1>Choose Your Plan</h1>
                <p>We offer a great pricing plan for you</p>
            </div>
            <div className="planes">
                <div className="card">
                    <div className="boarding" />
                    <div className="content">
                        <h3>Basic</h3>
                        <h4>Free</h4>
                        <ul>
                            <li className="active">
                                <FaRegCircleXmark className="xmark" />
                                <FaRegCircleCheck className="check" />
                                <span>Over 80 million songs</span>
                            </li>
                            <li className="active">
                                <FaRegCircleXmark className="xmark" />
                                <FaRegCircleCheck className="check" />
                                <span>Listen to music for free</span>
                            </li>
                            <li>
                                <FaRegCircleXmark className="xmark" />
                                <FaRegCircleCheck className="check" />
                                <span>Ad-free listening to music</span>
                            </li>
                            <li>
                                <FaRegCircleXmark className="xmark" />
                                <FaRegCircleCheck className="check" />
                                <span>Download music</span>
                            </li>
                            <li>
                                <FaRegCircleXmark className="xmark" />
                                <FaRegCircleCheck className="check" />
                                <span>Highest music quality</span>
                            </li>
                            <li>
                                <FaRegCircleXmark className="xmark" />
                                <FaRegCircleCheck className="check" />
                                <span>Change username</span>
                            </li>
                            <li>
                                <FaRegCircleXmark className="xmark" />
                                <FaRegCircleCheck className="check" />
                                <span>Sale 16%</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="card">
                    <div className="boarding" />
                    <div className="content">
                        <h3>Premium</h3>
                        <h4>$1 / monthly</h4>
                        <ul>
                            <li className="active">
                                <FaRegCircleXmark className="xmark" />
                                <FaRegCircleCheck className="check" />
                                <span>Over 80 million songs</span>
                            </li>
                            <li className="active">
                                <FaRegCircleXmark className="xmark" />
                                <FaRegCircleCheck className="check" />
                                <span>Listen to music for free</span>
                            </li>
                            <li className="active">
                                <FaRegCircleXmark className="xmark" />
                                <FaRegCircleCheck className="check" />
                                <span>Ad-free listening to music</span>
                            </li>
                            <li className="active">
                                <FaRegCircleXmark className="xmark" />
                                <FaRegCircleCheck className="check" />
                                <span>Download music</span>
                            </li>
                            <li className="active">
                                <FaRegCircleXmark className="xmark" />
                                <FaRegCircleCheck className="check" />
                                <span>Highest music quality</span>
                            </li>
                            <li className="active">
                                <FaRegCircleXmark className="xmark" />
                                <FaRegCircleCheck className="check" />
                                <span>Change username</span>
                            </li>
                            <li>
                                <FaRegCircleXmark className="xmark" />
                                <FaRegCircleCheck className="check" />
                                <span>Sale 16%</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="card">
                    <div className="boarding" />
                    <div className="content">
                        <h3>Premium+</h3>
                        <h4>$10 / yearly</h4>
                        <ul>
                            <li className="active">
                                <FaRegCircleXmark className="xmark" />
                                <FaRegCircleCheck className="check" />
                                <span>Over 80 million songs</span>
                            </li>
                            <li className="active">
                                <FaRegCircleXmark className="xmark" />
                                <FaRegCircleCheck className="check" />
                                <span>Listen to music for free</span>
                            </li>
                            <li className="active">
                                <FaRegCircleXmark className="xmark" />
                                <FaRegCircleCheck className="check" />
                                <span>Ad-free listening to music</span>
                            </li>
                            <li className="active">
                                <FaRegCircleXmark className="xmark" />
                                <FaRegCircleCheck className="check" />
                                <span>Download music</span>
                            </li>
                            <li className="active">
                                <FaRegCircleXmark className="xmark" />
                                <FaRegCircleCheck className="check" />
                                <span>Highest music quality</span>
                            </li>
                            <li className="active">
                                <FaRegCircleXmark className="xmark" />
                                <FaRegCircleCheck className="check" />
                                <span>Change username</span>
                            </li>
                            <li className="active">
                                <FaRegCircleXmark className="xmark" />
                                <FaRegCircleCheck className="check" />
                                <span>Sale 16%</span>
                            </li>
                        </ul>
                        <button></button>
                    </div>
                </div>
            </div>
            <div className="donation" style={{ marginTop: '24px' }}>
                <div className="card">
                    <div className="title">
                        <img src="/language/uz.svg" alt="uzb." />
                        <h2>Hozircha</h2>
                    </div>
                    <p>Premium olmoqchi bo&apos;lganlar Telegramdan murojat qiling <a href="https://t.me/LorenzonSupport" target="_blank" >@LorenzonSupport</a></p>
                    <p className="money">Qo&apos;llab quvvatlash | <Clipboard data-clipboard-text='5614 6827 0092 1572' onClick={()=>info('Copy to clipboard')}>5614 6827 0092 1572</Clipboard></p>
                </div>
                <div className="card">
                    <div className="title">
                        <img src="/language/en.svg" alt="eng." />
                        <h2>For now</h2>
                    </div>
                    <p>Those who want to get premium should contact Telegram <a href="https://t.me/LorenzonSupport" target="_blank" >@LorenzonSupport</a></p>
                    <p className="money">Donation | <Clipboard data-clipboard-text='5614 6827 0092 1572' onClick={()=>info('Copy to clipboard')}>5614 6827 0092 1572</Clipboard></p>
                </div>
                <div className="card">
                    <div className="title">
                        <img src="/language/ru.svg" alt="rus." />
                        <h2>На данный момент</h2>
                    </div>
                    <p>Желающим получить премиум следует обращаться в Telegram <a href="https://t.me/LorenzonSupport" target="_blank" >@LorenzonSupport</a></p>
                    <p className="money">Поддерживать |  <Clipboard data-clipboard-text='5614 6827 0092 1572' onClick={()=>info('Copy to clipboard')}>5614 6827 0092 1572</Clipboard></p>
                </div>
            </div>
        </SettingLayout>
    )
}
