// Customisation
binding = 1
ring_stagger = "0.5cy"
middle_stagger = "0.25cy"
index_stagger = "-0.25cy"
far_stagger = "-0.15cy"
thumb_angle = 10
thumb_dist = "4.6cx"

// Options for zones with keys in
keyed_zone_opts = {
    tags: {keyed: true},
    padding: "cy",
    bind: binding,
    footprints: {
        choc_hotswap: {
            type: "choc_custom",
            nets: {
                from: "=column_net",
                to: "GND"
            },
            params: {
                keycaps: true
            }
        }
    }
}

// Main zone for fingers
main_zone = {
    key: keyed_zone_opts,
    // rows: {
    //     bottom: {bind: binding},
    //     home: {bind: binding},
    //     top: {bind: binding}
    // },
    columns: {
        pinkie: {
            rows: {
                bottom: {column_net: "P2"},
                home: {column_net: "P15"},
                top: {column_net: "P7"}
            }
        },
        ring: {
            spread: "cx",
            stagger: ring_stagger,
            rows: {
                bottom: {column_net: "P3"},
                home: {column_net: "P14"},
                top: {column_net: "P18", tags: {sharp: true}}
            }
        },
        middle: {
            spread: "cx",
            stagger: middle_stagger,
            rows: {
                bottom: {column_net: "P4"},
                home: {column_net: "P16"},
                top: {column_net: "P19", tags: {sharp: true}}
            }
        },
        index: {
            spread: "cx",
            stagger: index_stagger,
            rows: {
                bottom: {column_net: "P5"},
                home: {column_net: "P10"},
                top: {column_net: "P20", tags: {sharp: true}}
            }
        },
        far: {
            spread: "cx",
            stagger: far_stagger,
            rows: {
                bottom: {column_net: "P6"},
                home: {column_net: "P1"},
                top: {column_net: "P21", tags: {sharp: true}}
            }
        }
    }
}

// Empty zone just for a custom anchor
custom_zone = {
    anchor: {
        ref: "main_pinkie_bottom",
        shift: ["-0.5cx-"+binding, "-0.5cy-"+binding]
    },
    columns: {x: {rows : {y: {name: "custom_anchor"}}}}
}

// Zone for thumb keys
thumb_zone = {
    key: keyed_zone_opts,
    anchor: {
        ref: "custom_anchor",
        shift: [thumb_dist + "+" + binding, "0.5cy+" + binding],
        orient: -thumb_angle
    },
    columns: {
        // near: {rows: {home: {column_net : "P0"}}},
        home: {rows: {home: {column_net : "P8"}}},
        far: {
            rows: {home: {column_net : "P9", tags: {sharp: true}}},
            rotate: -10,
            origin: ["-0.5cx", "-0.5cy"]
        }
    }
}

export_list = {
    raw: [
        {
            type: "keys",
            side: "left",
            tags: ["keyed"],
            size: ["1cx", "1cy"]
        },
        {
            type: "rectangle",
            size: [thumb_dist + "+0.5cx+" + binding, "2cy+" + binding],
            anchor: {
                ref: "thumb_home_home",
                shift: ["-" + thumb_dist + "-" + binding, "-0.5cy-" + binding]
            }
        },
        {
            type: "rectangle", // Make space for controller
            size: ["1.8cx", "2.3cy"],
            anchor: {
                ref: "main_far_bottom",
                shift: [0, 0]
            }
        },
        {
            type: "rectangle",
            operation: "intersect",
            size: ["100cx","100cy"],
            anchor: {
                ref: "thumb_far_home",
                shift: ["-99.5cx+"+binding, "-50cy"]
            }
        }
    ],
    cutouta: [{
        type: "outline",
        name: "raw",
        fillet: 1.5
    }],
    raw2: [
        {
            type: "outline",
            name: "cutouta"
        },
        {
            type: "rectangle", // Make space for controller
            size: ["1.8cx", "2.3cy"],
            anchor: {
                ref: "main_far_bottom",
                shift: [0, "-1.5cy"]
            }
        },
        {
            type: "keys",
            tags: ["sharp"],
            side: "left",
            size: ["1cx","1cy"]
        }
    ],
    cutout: [{
        type: "outline",
        name: "raw2",
        fillet: 1
    }],
    keycap_outlines: [{
        type: "keys",
        tags: ["keyed"],
        side: "left",
        size: ["1cx-0.5", "1cy-0.5"], // Choc keycaps are 17.5 x 16.5
        bound: false
    }]
}

// Power switch shift
p_sw_shift_x = "0.5cx+21"
p_sw_shift_y = "-0.2cy"
// Reset switch shift
r_sw_shift_x = "0.5cx+21"
r_sw_shift_y = "-0.75cy"

fprint_list = {
    promicro: {
        type: "promicro_pretty",
        anchor: {
            ref: "main_far_home",
            shift: ["0.5cx+12", "0.25cy"],
            rotate: -90
        }
    },
    bat: {
        type: "bat",
        nets: {neg: "GND"},
        anchor: {
            ref: "main_far_bottom",
            shift: ["0.5cx+3.5", "-0.1cy"]
        }
    },
    pcm12: {
        type: "pcm12",
        nets: {from:"pos", to:"RAW"},
        anchor: {
            ref: "main_far_bottom",
            shift: [p_sw_shift_x, p_sw_shift_y],
            rotate: 90
        },
        params: {reverse: true}
    },
    via_p1: {
        type: "via",
        nets: {net: "pos"},
        anchor: {
            ref: "main_far_bottom",
            shift: [p_sw_shift_x+"-5", p_sw_shift_y+"-2"]
        }
    },
    via_p2: {
        type: "via",
        nets: {net: "RAW"},
        anchor: {
            ref: "main_far_bottom",
            shift: [p_sw_shift_x+"-5", p_sw_shift_y+"+2"]
        }
    },
    b3u1000p: {
        type: "b3u1000p",
        nets: {r1: "RST", r2: "GND"},
        anchor: {
            ref: "main_far_bottom",
            shift: [r_sw_shift_x, r_sw_shift_y],
            rotate: 90
        },
        params: {reverse: true}
    },
    via_r1: {
        type: "via",
        nets: {net: "GND"},
        anchor: {
            ref: "main_far_bottom",
            shift: [r_sw_shift_x+"-5", r_sw_shift_y+"-2"]
        }
    },
    via_r2: {
        type: "via",
        nets: {net: "RST"},
        anchor: {
            ref: "main_far_bottom",
            shift: [r_sw_shift_x+"-5", r_sw_shift_y+"+2"]
        }
    },
    jlc_order: {
        type: "text",
        anchor: {
            ref: "main_pinkie_home",
            shift: [0, "0.5cy+1"]
        },
        params: {
            text: "JLCJLCJLCJLC",
            justify: "top"
        }
    },
    label_f: {
        type: "text",
        anchor: {
            // ref: ["main_pinkie_bottom", "thumb_home_home"]
            // ref: "main_middle_bottom",
            // shift: [0, "-0.8cy"]
            ref: "main_pinkie_bottom",
            shift: ["2cx", "-0.5cy"]
        },
        params: {
            text: "vivus v0.1\\nby l-kershaw",
            h_size: 2,
            v_size: 2,
            justify: "bottom"
        }
    },
    label_b: {
        type: "text",
        anchor: {
            // ref: ["main_pinkie_bottom", "thumb_home_home"]
            // ref: "main_middle_bottom",
            // shift: [0, "-0.8cy"]
            ref: "main_pinkie_bottom",
            shift: ["2cx", "-0.5cy"]
        },
        params: {
            text: "vivus v0.1\\nby l-kershaw",
            layer: "B.SilkS",
            h_size: 2,
            v_size: 2,
            justify: "bottom mirror"
        }
    }
}


return {
    points: {
        zones: {
            main: main_zone,
            custom: custom_zone,
            thumb: thumb_zone
        }
    },
    outlines: {
        exports: export_list
    },
    pcbs: {
        board: {
            outlines: {main: {outline: "cutout"}},
            footprints: fprint_list
        }
    }
}

