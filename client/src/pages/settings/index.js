import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Calendar } from 'react-date-range';
import { useForm } from "react-hook-form";
import { v4 as uuid } from 'uuid';
import axios from "axios";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../lib/firebase/firebase";

import { wrong, success, warning } from "../../utils/toastify";
import { useStore } from "../../store/zustand";
import Loading from "../../components/loading/setting";
import SettingLayout from "../../layouts/settings";
import Error from "../../components/other/error";
import country from "../../utils/country";

import { SiYoutube, SiFacebook, SiTelegram, SiSpotify } from "react-icons/si";
import { PiInstagramLogoFill } from "react-icons/pi";
import { HiAtSymbol, HiLink } from "react-icons/hi";

export default function Settings() {
    const setLoading = useStore(state => state.setLoading);
    const localUser = useStore((state) => state.user);
    const { handleSubmit } = useForm();

    const [banner, setBanner] = useState(undefined);
    const [avatar, setAvatar] = useState(undefined);
    const [isHoveringBanner, setIsHoveredBanner] = useState(false);
    const [isHoveringAvatar, setIsHoveredAvatar] = useState(false);

    const { data: user, isLoading, isError, isSuccess, refetch } = useQuery({
        queryKey: ['user'],
        queryFn: () => axios.get(`${process.env.NEXT_PUBLIC_SERVER_API}/users/${localUser._id}`, { headers: { 'secret': process.env.NEXT_PUBLIC_SECRET } }).then(({ data }) => data),
    })

    // FORM
    const [name, setName] = useState(localUser.name);
    const [username, setUsername] = useState(localUser.username);
    const [visibleCalendar, setVisibleCalendar] = useState(false)
    const [gender, setGender] = useState('');
    const [country, setCountry] = useState('');
    const [birthday, setBirthday] = useState('')
    const [bio, setBio] = useState('');
    const [website, setWebsite] = useState('');
    const [youtube, setYoutube] = useState('');
    const [instagram, setInstagram] = useState('');
    const [facebook, setFacebook] = useState('');
    const [telegram, setTelegram] = useState('');
    const [spotify, setSpotify] = useState('');
    const randomID = uuid().split('-')[4];

    // soon
    // const [allCountry, setAllCountry] = useState(country);
    // const [newCountry, setNewCountry] = useState([]);
    // const [searchInput, setSearchInput] = useState("");
    // const [selectCountry, setSelectCountry] = useState("country");
    // const [ocCountry, setOcCountry] = useState(false);
    // const [selectGender, setSelectGender] = useState("gender");
    // const [ocGender, setOcGender] = useState(false);


    useEffect(() => {
        if (user) {
            setName(user.name)
            setUsername(user.username)
            setGender(user.gender)
            setCountry(user.country)
            setBirthday(user.birthday)
            setBio(user.description || '')
            setWebsite(user.website || '')

            if (user.socials) {
                setYoutube(user.socials.youtube || '')
                setInstagram(user.socials.instagram || '')
                setFacebook(user.socials.facebook || '')
                setTelegram(user.socials.telegram || '')
                setSpotify(user.socials.spotify || '')
            }
        }
    }, [user])

    const onSubmit = () => {
        if (website && !website.startsWith('https://www.')) {
            warning('Website link must start with ↓ (https://www.example.com)')
            return
        }
        if (website && website.length < 12) {
            warning('Website link should not be less than 12 characters')
            return
        }
        if (youtube && !youtube.startsWith('https://www.youtube.com/')) {
            warning('YouTube link must start with ↓ (https://www.youtube.com/...)')
            return
        }
        if (instagram && !instagram.startsWith('https://www.instagram.com/')) {
            warning('Instagram link must start with ↓ (https://www.instagram.com/...)')
            return
        }
        if (facebook && !facebook.startsWith('https://www.facebook.com/')) {
            warning('Facebook link must start with ↓ (https://www.facebook.com/...)')
            return
        }
        if (telegram && !(telegram.startsWith('https://www.t.me/') || telegram.startsWith('https://www.telegram.me/'))) {
            warning('Telegram link must start with ↓ (https://www.telegram.me/...) or (https://www.t.me/...)')
            return
        }
        if (spotify && !spotify.startsWith('https://open.spotify.com/')) {
            warning('Spotify link must start with ↓ (https://open.spotify.com/...)')
            return
        }

        const request = (image, banner) => {
            axios.put(`${process.env.NEXT_PUBLIC_SERVER_API}/users/${user._id}`, {
                name: name || user.name,
                email: user.email,
                password: user.password,
                status: user.status,
                premium: user.premium || null,
                role: user.role,
                username: username || user.username,
                gender: gender || user.gender,
                country: country || user.country,
                birthday: birthday || user.birthday,
                image: image || user.image,
                banner: banner || user.banner,
                lastSong: user.lastSong,
                recently: user.recently,
                description: bio || user.description || null,
                website: website || user.website || null,
                socials: {
                    youtube: youtube || (user.socials && user.socials.youtube) || null,
                    instagram: instagram || (user.socials && user.socials.instagram) || null,
                    facebook: facebook || (user.socials && user.socials.facebook) || null,
                    telegram: telegram || (user.socials && user.socials.telegram) || null,
                    spotify: spotify || (user.socials && user.socials.spotify) || null,
                },
                followers: user.followers,
                following: user.following
            }, { headers: { 'secret': process.env.NEXT_PUBLIC_SECRET } }).then(({ data }) => success(data)).catch(err => { console.log(err); wrong('This username is already taken') }).finally(() => setLoading(false))
        }

        setLoading(true)
        if (banner && avatar) {
            const storageImageRef = ref(storage, `users/${randomID}.${avatar.name}`);
            const uploadImageTask = uploadBytesResumable(storageImageRef, avatar);

            uploadImageTask.on("state_changed",
                (snapshot) => console.log(snapshot),
                (error) => {
                    wrong(`Error: no uploading ${avatar.name}`);
                    console.log(error);
                }, () => getDownloadURL(uploadImageTask.snapshot.ref).then(
                    async (downloadImageURL) => {
                        const storageBannerRef = ref(storage, `banner/${randomID}.${banner.name}`);
                        const uploadBannerTask = uploadBytesResumable(storageBannerRef, banner);

                        uploadBannerTask.on("state_changed",
                            (snapshot) => console.log(snapshot),
                            (error) => {
                                wrong(`Error: no uploading ${banner.name}`);
                                console.log(error);
                            }, () => getDownloadURL(uploadBannerTask.snapshot.ref).then(
                                async (downloadBannerURL) => request(downloadImageURL, downloadBannerURL)
                            )
                        );
                    }
                )
            );
        } else if (banner) {
            const storageBannerRef = ref(storage, `banner/${randomID}.${banner.name}`);
            const uploadBannerTask = uploadBytesResumable(storageBannerRef, banner);

            uploadBannerTask.on("state_changed",
                (snapshot) => console.log(snapshot),
                (error) => {
                    wrong(`Error: no uploading ${banner.name}`);
                    console.log(error);
                }, () => getDownloadURL(uploadBannerTask.snapshot.ref).then(
                    async (downloadBannerURL) => request(user.image, downloadBannerURL)
                )
            );
        } else if (avatar) {
            const storageImageRef = ref(storage, `users/${randomID}.${avatar.name}`);
            const uploadImageTask = uploadBytesResumable(storageImageRef, avatar);

            uploadImageTask.on("state_changed",
                (snapshot) => console.log(snapshot),
                (error) => {
                    wrong(`Error: no uploading ${avatar.name}`);
                    console.log(error);
                }, () => getDownloadURL(uploadImageTask.snapshot.ref).then(
                    async (downloadImageURL) => request(downloadImageURL, user.banner)
                )
            );
        } else {
            request(user.image, user.banner)
        }
    }

    function getDimensionsBanner(event) {
        if (event.target.files[0]) {
            let url = URL.createObjectURL(event.target.files[0]);
            let img = new Image()
            img.src = url;
            img.onload = () => {
                URL.revokeObjectURL(url);
                if (img.naturalWidth == 2560 && img.naturalHeight == 380) {
                    setBanner(event.target.files[0])
                    success('Success, Image size is correct')
                } else {
                    wrong('Image must be 2560x380 pixels');
                }
            };
        } else {
            if (banner) {
                setBanner(undefined)
                warning('Image removed');
            }
        }
    }

    function getDimensionsAvatar(event) {
        if (event.target.files[0]) {
            let url = URL.createObjectURL(event.target.files[0]);
            let img = new Image()
            img.src = url;
            img.onload = () => {
                URL.revokeObjectURL(url);
                if (img.naturalWidth == img.naturalHeight && img.naturalWidth <= 1000) {
                    setAvatar(event.target.files[0])
                    success('Success, Image size is correct')
                } else {
                    wrong('Image must be 512x512 pixels');
                }
            };
        } else {
            if (banner) {
                setAvatar(undefined)
                warning('Image removed');
            }
        }
    }

    function handleUsername(event) {
        if (user.status !== 'basic' || user.role !== 'user') {
            setUsername(event.target.value.toLowerCase())
        } else {
            warning("Buy a premium")
        }
    }

    function handleBio(event) {
        if (event.target.value.length >= 300) warning('No more than 300 letters')
        else setBio(event.target.value)
    }

    function handleClear() {
        setName(user.name)
        setUsername(user.username)
        setGender(user.gender)
        setCountry(user.country)
        setBirthday(user.birthday)
        setBio(user.description || '')
        setWebsite(user.website || '')

        if (user.socials) {
            setYoutube(user.socials.youtube || '')
            setInstagram(user.socials.instagram || '')
            setFacebook(user.socials.facebook || '')
            setTelegram(user.socials.telegram || '')
            setSpotify(user.socials.spotify || '')
        }

        setBanner(undefined)
        setAvatar(undefined)

        success("Clearing")
    }

    const [maxDate, setMaxDate] = useState(new Date())
    const [selectDate, setSelectDate] = useState(new Date())
    useEffect(() => {
        const maxDay = new Date()
        maxDay.setFullYear(new Date().getFullYear() - 12)
        setMaxDate(maxDay)

        if (birthday) {
            const selectDay = new Date()
            selectDay.setFullYear(birthday.split('/')[0])
            selectDay.setMonth(birthday.split('/')[1] - 1)
            selectDay.setDate(birthday.split('/')[2])
            setSelectDate(selectDay)
        }
    }, [birthday])

    if (isLoading) return <Loading />
    if (isSuccess) return (
        <SettingLayout title="Your profile">
            <div className="images">
                <label htmlFor="banner-input"
                    className={`banner-setting${banner ? ' active' : ''}`}
                    onMouseEnter={() => setIsHoveredBanner(true)}
                    onMouseLeave={() => setIsHoveredBanner(false)}
                >
                    <img src={(banner && URL.createObjectURL(banner)) || user.banner || '/other/unknown.banner.webp'} />
                    <input accept="image/*" type="file" name="banner-input" id="banner-input" onChange={getDimensionsBanner} />
                    {(!banner || isHoveringBanner) && <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><path d='M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z' fill="white" /></svg>}
                </label>
                <label htmlFor="avatar-input"
                    className={`avatar-setting${avatar ? ' active' : ''}`}
                    onMouseEnter={() => setIsHoveredAvatar(true)}
                    onMouseLeave={() => setIsHoveredAvatar(false)}
                >
                    <img src={(avatar && URL.createObjectURL(avatar)) || user.image || '/other/unknown.user.webp'} />
                    <input accept="image/*" type="file" name="avatar-input" id="avatar-input" onChange={getDimensionsAvatar} />
                    {(!avatar || isHoveringAvatar) && <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><path d='M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z' fill="white" /></svg>}
                </label>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="frame">
                    <div className="our">
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" name="name" value={name} onChange={({ target }) => setName(target.value)} placeholder="Empty" />
                        </div>
                        <div className={`form-group${user.role == 'user' ? ' non-active' : ''}`}>
                            <label htmlFor="username">Username</label>
                            <div className="username media at">
                                <HiAtSymbol />
                                <input type="text" id="username" name="username" value={username} onChange={handleUsername} placeholder="Empty" />
                            </div>
                        </div>
                        <div className="flex">
                            <div className="form-group">
                                <label htmlFor="gender">Gender</label>
                                <input type="text" id="gender" name="gender" placeholder="Empty" value={gender ? gender.charAt(0).toUpperCase() + gender.slice(1) : gender} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="country">Country</label>
                                <input type="text" id="country" name="country" placeholder="Empty" value={country ? country.charAt(0).toUpperCase() + country.slice(1) : country} />
                            </div>
                        </div>
                        <div className="flex" onClick={() => setVisibleCalendar(true)}>
                            <div className="form-group">
                                <label htmlFor="bitrhday">Bithday</label>
                                <input type="number" id="bitrhday" name="bitrhday" placeholder="Day" value={birthday && birthday.split('/')[2]} />
                            </div>
                            <div className="form-group">
                                <input type="number" id="bitrhday" name="bitrhday" placeholder="Month" value={birthday && birthday.split('/')[1]} />
                            </div>
                            <div className="form-group">
                                <input type="number" id="bitrhday" name="bitrhday" placeholder="Year" value={birthday && birthday.split('/')[0]} />
                            </div>
                            {visibleCalendar && <Calendar
                                date={selectDate || maxDate}
                                onChange={(data) => {
                                    setVisibleCalendar(false)
                                    const year = data.getFullYear()
                                    const month = data.getMonth() < 10 ? `0${data.getMonth() + 1}` : data.getMonth() + 1
                                    const day = data.getDate() < 10 ? `0${data.getDate()}` : data.getDate()
                                    setBirthday(`${year}/${month}/${day}`)
                                }}
                                maxDate={maxDate}
                            />}
                        </div>
                        <div className="form-group">
                            <label htmlFor="website">Website</label>
                            <div className={`example media${website ? ' active' : ''}`}>
                                <HiLink />
                                <input type="text" id="website" name="website" placeholder="https://www.examlpe.com" value={website} onChange={({ target }) => setWebsite(target.value)} />
                            </div>
                        </div>
                    </div>
                    <div className="right">
                        <div className="form-group area">
                            <label htmlFor="bio">Bio</label>
                            <textarea name="bio" id="bio" maxLength={300} value={bio} onChange={handleBio} placeholder="Empty"></textarea>
                        </div>
                        <div className="form-group socials">
                            <label htmlFor="social">Socials</label>
                            <div className={`youtube media${youtube ? ' active' : ''}`}>
                                <SiYoutube />
                                <input type="text" id="social" name="social" placeholder="https://www.youtube.com" value={youtube} onChange={({ target }) => setYoutube(target.value)} />
                            </div>
                            <div className={`instagram media${instagram ? ' active' : ''}`}>
                                <PiInstagramLogoFill />
                                <input type="text" id="social" name="social" placeholder="https://www.instagram.com" value={instagram} onChange={({ target }) => setInstagram(target.value)} />
                            </div>
                            <div className={`facebook media${facebook ? ' active' : ''}`}>
                                <SiFacebook />
                                <input type="text" id="social" name="social" placeholder="https://www.facebook.com" value={facebook} onChange={({ target }) => setFacebook(target.value)} />
                            </div>
                            <div className={`telegram media${telegram ? ' active' : ''}`}>
                                <SiTelegram />
                                <input type="text" id="social" name="social" placeholder="https://telegram.me" value={telegram} onChange={({ target }) => setTelegram(target.value)} />
                            </div>
                            <div className={`spotify media${spotify ? ' active' : ''}`}>
                                <SiSpotify />
                                <input type="text" id="social" name="social" placeholder="https://open.spotify.com" value={spotify} onChange={({ target }) => setSpotify(target.value)} />
                            </div>

                        </div>
                    </div>
                </div>
                <div className="form-bottom">
                    <div className="id">
                        <p>ID: {user._id}</p>
                    </div>
                    <div className="btn-group">
                        <button type="reset" onClick={handleClear}>clear</button>
                        <button type="submit">save</button>
                    </div>
                </div>
            </form>
        </SettingLayout>
    )
    return <Error />
}
